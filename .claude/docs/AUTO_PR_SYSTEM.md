# Automated PR Creation System

## Overview

This system automatically creates a GitHub Pull Request after the Verification phase completes with `READY FOR PR` status. The automation ensures all safety checks pass before creating the PR and never auto-merges.

## Architecture

The system consists of three components:

### 1. Post-Verification Hook
**File**: `.claude/hooks/post-verification-pr.js`

Triggers after any Skill tool use and checks if:
- The verification skill just completed
- `verification-report.md` shows `READY FOR PR` status
- No duplicate PR creation has occurred

If conditions are met, executes the auto-PR script.

### 2. Auto-PR Script
**File**: `.claude/scripts/auto-create-pr.sh`

Bash script that performs all safety checks and creates the PR:

**Safety Checks** (in order):
1. ✓ Verification status is `READY FOR PR`
2. ✓ All tests pass (`node --test tests/*.test.js`)
3. ✓ Syntax check passes (`node --check app.js`)
4. ✓ Git working tree is clean (no uncommitted changes)
5. ✓ At least one commit exists
6. ✓ Remote repository is configured
7. ✓ GitHub CLI (`gh`) is installed
8. ✓ GitHub CLI is authenticated
9. ✓ No existing PR for current branch
10. ✓ `pr.md` exists

**PR Creation Process**:
1. Extract PR title from `pr.md`
2. Extract PR body from `pr.md`
3. Determine base branch (main or master)
4. Push current branch to remote
5. Create PR using `gh pr create`
6. Capture and log actual PR URL
7. **Never auto-merge**

### 3. Workflow Alternative
**File**: `.claude/workflows/auto-pr-workflow.js`

Optional workflow-based approach that can be invoked via `/workflow auto-pr-creation`.

Uses two phases:
- **Phase 1: Safety Checks** - Agent performs all prerequisite checks
- **Phase 2: PR Creation** - Agent creates the PR using gh CLI

## Configuration

### Hook Configuration
**File**: `.claude/settings.json`

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Skill",
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/hooks/post-verification-pr.js",
            "comment": "Automated PR creation after verification completes"
          }
        ]
      }
    ]
  }
}
```

### Trigger Mechanism

The hook is triggered by:
- Any Skill tool use (to detect verification skill completion)
- Checks if verification just completed with READY FOR PR status
- Uses flag file (`.claude/logs/pr-trigger.flag`) to prevent duplicates

### Logging

All operations are logged to:
- `.claude/logs/post-verification.log` - Hook execution log
- `.claude/logs/auto-pr.log` - PR creation script log

## Usage

### Automatic (Recommended)

1. Complete all SDLC phases through Verification
2. When `/verify` completes with `READY FOR PR` status
3. Hook automatically triggers PR creation
4. PR URL is logged and reported

### Manual Workflow Invocation

If you prefer manual control:

```bash
# Via workflow
/workflow auto-pr-creation

# Or directly via script
bash .claude/scripts/auto-create-pr.sh
```

### Prerequisites

Before the system can create PRs, ensure:

1. **Git Configuration**:
   ```bash
   git remote add origin <repository-url>
   git push -u origin <branch>
   ```

2. **GitHub CLI Installation**:
   ```bash
   # Install gh CLI
   # Windows: https://cli.github.com/
   # Mac: brew install gh
   # Linux: See https://cli.github.com/manual/installation
   ```

3. **GitHub CLI Authentication**:
   ```bash
   gh auth login
   ```

4. **Verification Complete**:
   - Run `/verify` skill
   - Confirm status is `READY FOR PR`

## Safety Features

### Non-Blocking
- Hook runs asynchronously
- Does not block the verification skill
- Failures don't affect SDLC completion

### Comprehensive Checks
- 10 safety checks before PR creation
- Each check logs results
- Fails fast on any check failure

### Duplicate Prevention
- Flag file prevents multiple PR attempts
- Checks for existing PRs on branch
- Verifies remote and commit state

### No Auto-Merge
- PR is created but never merged automatically
- Requires manual review and approval
- Preserves code review process

### Error Handling
- All errors logged with details
- Script exits cleanly on failure
- Provides actionable error messages

## Testing

### Test the Complete Flow

1. **Setup Test Environment**:
   ```bash
   # Ensure gh CLI is installed and authenticated
   gh auth status

   # Verify remote is configured
   git remote -v
   ```

2. **Test Auto-PR Script Directly**:
   ```bash
   bash .claude/scripts/auto-create-pr.sh
   ```

3. **Test Hook Trigger**:
   ```bash
   # Trigger hook manually
   node .claude/hooks/post-verification-pr.js
   ```

4. **Test Complete SDLC Flow**:
   - Start fresh branch
   - Run all SDLC phases
   - Complete verification
   - Observe automatic PR creation

### Verify Logs

Check logs after each test:

```bash
# View hook log
cat .claude/logs/post-verification.log

# View PR creation log
cat .claude/logs/auto-pr.log
```

## Troubleshooting

### Common Issues

#### 1. "GitHub CLI not found"
**Solution**: Install gh CLI from https://cli.github.com/

#### 2. "GitHub CLI not authenticated"
**Solution**: Run `gh auth login`

#### 3. "No remote repository configured"
**Solution**: Run `git remote add origin <url>`

#### 4. "Working tree has uncommitted changes"
**Solution**: Commit or stash changes before verification

#### 5. "PR already exists for branch"
**Solution**: Close or merge existing PR, or use a new branch

#### 6. Hook doesn't trigger
**Solution**: 
- Check `.claude/settings.json` hook configuration
- Verify verification-report.md shows READY FOR PR
- Check logs in `.claude/logs/post-verification.log`

### Debug Mode

Enable detailed logging:

```bash
# View real-time log
tail -f .claude/logs/auto-pr.log

# Test script with verbose output
bash -x .claude/scripts/auto-create-pr.sh
```

## Integration with SDLC

### SDLC Phase Flow

1. **Requirements** → `requirements.md`
2. **Architecture** → `architecture.md`
3. **Design Review** → `design-review.md`
4. **Implementation Planning** → `impl-plan.md`
5. **Implementation** → Application + test files
6. **Code Review** → `code-review.md`
7. **Verification** → `verification-report.md` (READY FOR PR)
8. **🔄 AUTO-PR TRIGGER** → GitHub PR created automatically
9. **PR Review** → Manual review and merge

### Hook Trigger Point

```
Verification Skill (/verify)
         ↓
verification-report.md written
         ↓
PostToolUse hook fires
         ↓
post-verification-pr.js checks status
         ↓
Status = READY FOR PR?
         ↓
    Yes → Execute auto-create-pr.sh
         ↓
    All safety checks pass?
         ↓
    Yes → gh pr create
         ↓
    PR URL logged and reported
```

## Maintenance

### Updating Safety Checks

To add new safety checks:

1. Edit `.claude/scripts/auto-create-pr.sh`
2. Add check in numbered sequence
3. Update check count in documentation
4. Test thoroughly

### Disabling Auto-PR

To disable automatic PR creation:

1. **Option 1**: Remove hook from `.claude/settings.json`
2. **Option 2**: Delete `.claude/hooks/post-verification-pr.js`
3. **Option 3**: Add check to skip if `AUTO_PR=false` env var

### Customizing PR Creation

Edit `.claude/scripts/auto-create-pr.sh`:

```bash
# Customize PR title extraction
PR_TITLE=$(grep -m 1 "^# " pr.md | sed 's/^# //')

# Customize base branch selection
BASE_BRANCH="develop"  # Change from main

# Add PR labels
gh pr create --label "automated" --label "ready-for-review"

# Add reviewers
gh pr create --reviewer "username"
```

## Security Considerations

### Sensitive Data
- Script never commits or pushes untracked files
- Checks for clean working tree before PR creation
- Logs don't contain authentication tokens

### Authentication
- Uses existing gh CLI authentication
- Never stores credentials
- Respects GitHub authentication state

### Permissions
- Requires repository write access
- Requires PR creation permissions
- Follows GitHub repository settings

## Performance

### Execution Time
- Safety checks: ~5-10 seconds
- PR creation: ~5-10 seconds
- Total: ~10-20 seconds

### Resource Usage
- Minimal CPU usage
- Minimal memory usage
- Network I/O for gh CLI operations

## Future Enhancements

Potential improvements (out of current scope):

1. **Notifications**: Slack/email notifications on PR creation
2. **PR Templates**: Support for custom PR templates
3. **Multi-Repo**: Support for monorepo PR creation
4. **Rollback**: Automatic rollback on PR creation failure
5. **Analytics**: Track PR creation metrics
6. **CI Integration**: Wait for CI checks before creating PR

## References

- GitHub CLI Documentation: https://cli.github.com/manual/
- Claude Code Hooks: See `.claude/docs/hooks.md`
- SDLC Documentation: See `CLAUDE.md`
