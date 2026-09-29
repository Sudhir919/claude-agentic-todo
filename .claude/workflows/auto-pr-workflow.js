/**
 * Automated PR Creation Workflow
 *
 * This workflow is triggered after the Verification phase completes with READY FOR PR status.
 * It performs all safety checks and creates the GitHub Pull Request automatically.
 *
 * Safety Checks:
 * 1. Verification status is READY FOR PR
 * 2. All tests pass
 * 3. Syntax check passes
 * 4. Git working tree is clean
 * 5. At least one commit exists
 * 6. Remote repository is configured
 * 7. GitHub CLI (gh) is installed
 * 8. GitHub CLI is authenticated
 * 9. No existing PR for current branch
 * 10. pr.md exists
 *
 * The PR is never auto-merged.
 */

export const meta = {
  name: 'auto-pr-creation',
  description: 'Automatically create GitHub PR after verification reaches READY FOR PR',
  phases: [
    { title: 'Safety Checks', detail: 'Verify all prerequisites' },
    { title: 'PR Creation', detail: 'Create GitHub Pull Request' }
  ]
};

/**
 * Main workflow execution
 */
async function run() {
  // Phase 1: Safety Checks
  const safetyChecks = await phase('Safety Checks', async () => {
    return await agent(
      `Perform comprehensive safety checks before creating PR:

1. Read verification-report.md and confirm status is READY FOR PR
2. Run test suite: node --test tests/*.test.js
3. Run syntax check: node --check app.js
4. Check git status for uncommitted changes
5. Verify at least one commit exists
6. Verify remote repository is configured
7. Check if gh CLI is installed
8. Check if gh CLI is authenticated
9. Check for existing PRs on current branch
10. Verify pr.md exists

Return a structured result with:
- allChecksPassed: boolean
- checks: array of {name, status, details}
- canProceed: boolean
- errors: array of error messages if any

If any check fails, return canProceed: false with error details.`,
      {
        label: 'safety-checks',
        phase: 'Safety Checks',
        schema: {
          type: 'object',
          properties: {
            allChecksPassed: { type: 'boolean' },
            canProceed: { type: 'boolean' },
            checks: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  status: { type: 'string' },
                  details: { type: 'string' }
                }
              }
            },
            errors: {
              type: 'array',
              items: { type: 'string' }
            },
            currentBranch: { type: 'string' },
            remoteUrl: { type: 'string' }
          }
        }
      }
    );
  });

  // If safety checks failed, stop here
  if (!safetyChecks.canProceed) {
    return {
      success: false,
      message: 'Safety checks failed - PR creation aborted',
      errors: safetyChecks.errors,
      checks: safetyChecks.checks
    };
  }

  // Phase 2: Create PR
  const prCreation = await phase('PR Creation', async () => {
    return await agent(
      `All safety checks passed. Create the GitHub Pull Request:

1. Extract PR title from pr.md (first # heading)
2. Extract PR body from pr.md (everything after title)
3. Determine base branch (prefer main, fallback to master)
4. Push current branch to remote if needed
5. Create PR using gh CLI:
   gh pr create --title "<title>" --body-file <body> --base <base> --head <current>
6. Capture and return the actual PR URL
7. Do NOT merge the PR automatically

Return structured result with:
- success: boolean
- prUrl: string (actual URL from gh CLI output)
- prNumber: number
- baseBranch: string
- headBranch: string
- message: string

If PR creation fails, return success: false with error details.

IMPORTANT:
- Use the actual PR URL returned by gh CLI
- Never invent or guess URLs
- Do not auto-merge the PR
- Report the real PR URL to the user`,
      {
        label: 'create-pr',
        phase: 'PR Creation',
        schema: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            prUrl: { type: 'string' },
            prNumber: { type: 'number' },
            baseBranch: { type: 'string' },
            headBranch: { type: 'string' },
            message: { type: 'string' },
            error: { type: 'string' }
          }
        }
      }
    );
  });

  // Return final result
  if (prCreation.success) {
    return {
      success: true,
      message: 'GitHub Pull Request created successfully',
      prUrl: prCreation.prUrl,
      prNumber: prCreation.prNumber,
      baseBranch: prCreation.baseBranch,
      headBranch: prCreation.headBranch,
      safetyChecks: safetyChecks.checks,
      note: 'PR has NOT been auto-merged. Please review and merge manually.'
    };
  } else {
    return {
      success: false,
      message: 'Failed to create GitHub Pull Request',
      error: prCreation.error,
      safetyChecks: safetyChecks.checks
    };
  }
}

// Execute the workflow
const result = await run();
return result;
