---
name: pr
description: Execute PR Preparation phase - create comprehensive pull request documentation
---

# Pull Request Skill

## Purpose

Execute the PR Preparation phase of the SDLC by creating comprehensive pull request documentation.

## SDLC Phase

**Phase 8: Pull Request Preparation**

## Agent

Uses `.claude/agents/pr-agent.md`

## Inputs Required

- All SDLC documentation files
- All application and test files
- `verification-report.md` - Verification results
- `CLAUDE.md` - Project overview
- `Instructions/instructions.md` - Project instructions

## Expected Output

Creates or updates `pr.md` with:
- PR summary
- Project purpose
- Changes made (all files)
- Test evidence (syntax check, test suite results)
- Requirements coverage (30/30)
- Implementation approach
- Known limitations
- Comprehensive reviewer checklist
- PR creation status

Optionally creates actual GitHub PR if:
- Remote repository exists
- User confirms PR creation

## Important Constraints

- **Remote Check**: Must verify remote exists before creating GitHub PR
- **Actual Results**: Must report actual test results from verification-report.md
- **No Code Changes**: Do not modify application code during PR preparation
- **Completeness**: Include all relevant files in Changes Made section
- **Honesty**: Document known limitations accurately

## Execution

To execute this skill, the agent must:
1. Read verification-report.md and confirm status is READY FOR PR
2. Read all SDLC input files
3. Follow the detailed instructions in `.claude/agents/pr-agent.md`
4. Check git status
5. Check current branch
6. Check for commits
7. Check for remote repository
8. Check gh CLI availability and authentication
9. Check for existing PRs on current branch
10. Create/update `pr.md`
11. Only create GitHub PR when:
    - Verification status is READY FOR PR
    - Remote repository exists
    - Commits exist on current branch
    - gh CLI is available and authenticated
    - No existing PR exists for current branch
    - User explicitly requests PR creation
12. Capture and report actual PR URL (never invent URLs)
13. Never merge PR automatically
14. Report completion

## Usage

Invoke as: `/pr` or via Skills system
