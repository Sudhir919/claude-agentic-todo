---
name: verify
description: Execute Verification phase - systematically verify application readiness for PR
---

# Verification Skill

## Purpose

Execute the Verification phase of the SDLC by systematically verifying the application is ready for Pull Request preparation.

## SDLC Phase

**Phase 7: Verification**

## Agent

Uses `.claude/agents/verify-agent.md`

## Inputs Required

- All SDLC documentation files
- All application files (HTML, CSS, JavaScript)
- All test files
- `code-review.md` - Code review results
- `CLAUDE.md` - Project overview
- `Instructions/instructions.md` - Project instructions

## Expected Output

Creates or updates `verification-report.md` with:
- Syntax verification (`node --check app.js`)
- Automated test results (`node --test tests/*.test.js`)
- Manual verification of all operations
- Requirements verification (FR, NFR, AC)
- Architecture verification
- Security verification
- Documentation consistency verification
- Scope compliance verification
- Defects found and fixed
- Final readiness decision (READY FOR PR / NOT READY FOR PR)

## Important Constraints

- **Test Execution**: Must actually run tests, report actual results
- **Requirements**: Must verify ALL 30 requirements (11 FR + 6 NFR + 13 AC)
- **Architecture**: Verify three-layer compliance
- **Security**: Verify XSS prevention implementation
- **Documentation**: Verify consistency across all artifacts
- **Objectivity**: Base decision on evidence, not assumptions

## Execution

To execute this skill, the agent must:
1. Read all input files
2. Follow the detailed instructions in `.claude/agents/verify-agent.md`
3. Run syntax check: `node --check app.js`
4. Run test suite: `node --test tests/*.test.js`
5. Perform manual verification
6. Verify all requirements satisfied
7. Check documentation consistency
8. Create/update `verification-report.md`
9. Make final readiness decision
10. Report results

## Usage

Invoke as: `/verify` or via Skills system
