#!/bin/bash
# Automated PR Creation Script
# This script is triggered after verification reaches READY FOR PR status
# It performs all safety checks before creating the GitHub Pull Request

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOG_FILE="$PROJECT_ROOT/.claude/logs/auto-pr.log"

# Create logs directory if it doesn't exist
mkdir -p "$(dirname "$LOG_FILE")"

# Logging function
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "========================================"
log "Automated PR Creation Starting"
log "========================================"

# Navigate to project root
cd "$PROJECT_ROOT"

# Check 1: Verify verification-report.md exists and status is READY FOR PR
log "Check 1: Verifying READY FOR PR status..."
if [ ! -f "verification-report.md" ]; then
    log "ERROR: verification-report.md not found"
    exit 1
fi

if ! grep -q "READY FOR PR" verification-report.md; then
    log "ERROR: Verification status is not READY FOR PR"
    exit 1
fi
log "✓ Verification status confirmed: READY FOR PR"

# Check 2: Verify tests pass
log "Check 2: Running test suite..."
if ! node --test tests/*.test.js > /dev/null 2>&1; then
    log "ERROR: Tests are failing"
    exit 1
fi
log "✓ All tests passing"

# Check 3: Verify syntax check passes
log "Check 3: Running syntax check..."
if ! node --check app.js; then
    log "ERROR: Syntax check failed"
    exit 1
fi
log "✓ Syntax check passed"

# Check 4: Verify clean git tree (no uncommitted changes)
log "Check 4: Checking git working tree..."
if [ -n "$(git status --porcelain)" ]; then
    log "WARNING: Working tree has uncommitted changes"
    log "Uncommitted changes:"
    git status --short | tee -a "$LOG_FILE"
    log "ERROR: Please commit or stash changes before creating PR"
    exit 1
fi
log "✓ Working tree is clean"

# Check 5: Verify at least one commit exists
log "Check 5: Verifying commits exist..."
if ! git rev-parse HEAD > /dev/null 2>&1; then
    log "ERROR: No commits found in repository"
    exit 1
fi
COMMIT_COUNT=$(git rev-list --count HEAD)
log "✓ Found $COMMIT_COUNT commit(s)"

# Check 6: Verify remote repository exists
log "Check 6: Checking for remote repository..."
if ! git remote get-url origin > /dev/null 2>&1; then
    log "ERROR: No remote repository configured"
    log "Please add a remote: git remote add origin <url>"
    exit 1
fi
REMOTE_URL=$(git remote get-url origin)
log "✓ Remote repository: $REMOTE_URL"

# Check 7: Verify gh CLI is installed
log "Check 7: Checking GitHub CLI availability..."
if ! command -v gh &> /dev/null; then
    log "ERROR: GitHub CLI (gh) is not installed"
    log "Please install from: https://cli.github.com/"
    exit 1
fi
GH_VERSION=$(gh --version | head -n 1)
log "✓ GitHub CLI found: $GH_VERSION"

# Check 8: Verify gh CLI authentication
log "Check 8: Verifying GitHub CLI authentication..."
if ! gh auth status > /dev/null 2>&1; then
    log "ERROR: GitHub CLI is not authenticated"
    log "Please run: gh auth login"
    exit 1
fi
log "✓ GitHub CLI authenticated"

# Check 9: Get current branch
CURRENT_BRANCH=$(git branch --show-current)
log "Current branch: $CURRENT_BRANCH"

# Check 10: Check for existing PR on current branch
log "Check 9: Checking for existing PRs..."
EXISTING_PR=$(gh pr list --head "$CURRENT_BRANCH" --json number --jq '.[0].number' 2>/dev/null || echo "")
if [ -n "$EXISTING_PR" ]; then
    log "ERROR: PR #$EXISTING_PR already exists for branch $CURRENT_BRANCH"
    log "Please close or merge the existing PR before creating a new one"
    exit 1
fi
log "✓ No existing PR found for branch $CURRENT_BRANCH"

# Check 11: Verify pr.md exists
log "Check 10: Verifying pr.md exists..."
if [ ! -f "pr.md" ]; then
    log "ERROR: pr.md not found"
    log "Please run /pr skill to generate PR documentation"
    exit 1
fi
log "✓ pr.md found"

# Check 12: Extract PR title and body from pr.md
log "Extracting PR information from pr.md..."

# Extract title (first heading after any frontmatter)
PR_TITLE=$(grep -m 1 "^# " pr.md | sed 's/^# //' || echo "feat: implement agentic SDLC with Claude Code")
log "PR Title: $PR_TITLE"

# Create PR body from pr.md (skip title, keep rest)
PR_BODY_FILE="$(mktemp)"
tail -n +2 pr.md > "$PR_BODY_FILE"

# All checks passed - create the PR
log "========================================"
log "All safety checks passed"
log "Creating GitHub Pull Request..."
log "========================================"

# Determine base branch (prefer main, fallback to master)
BASE_BRANCH="main"
if ! git ls-remote --heads origin main | grep -q main; then
    BASE_BRANCH="master"
fi
log "Base branch: $BASE_BRANCH"

# Push current branch to remote if needed
log "Pushing branch to remote..."
if ! git push -u origin "$CURRENT_BRANCH" 2>&1 | tee -a "$LOG_FILE"; then
    log "ERROR: Failed to push branch to remote"
    rm -f "$PR_BODY_FILE"
    exit 1
fi
log "✓ Branch pushed successfully"

# Create the PR
log "Creating pull request..."
PR_URL=$(gh pr create \
    --title "$PR_TITLE" \
    --body-file "$PR_BODY_FILE" \
    --base "$BASE_BRANCH" \
    --head "$CURRENT_BRANCH" 2>&1 | tee -a "$LOG_FILE" | grep -o 'https://github.com/[^[:space:]]*' || echo "")

# Clean up temp file
rm -f "$PR_BODY_FILE"

if [ -z "$PR_URL" ]; then
    log "ERROR: Failed to create pull request"
    log "Please check the error messages above"
    exit 1
fi

log "========================================"
log "✓ SUCCESS: Pull Request Created"
log "========================================"
log "PR URL: $PR_URL"
log ""
log "IMPORTANT: The PR has NOT been merged automatically"
log "Please review the PR and merge manually when ready"
log "========================================"

# Output PR URL to stdout for capture
echo "$PR_URL"

exit 0
