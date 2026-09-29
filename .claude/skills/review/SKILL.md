---
name: review
description: Execute Code Review phase - review code against requirements and best practices
---

# Code Review Skill

## Purpose

Execute the Code Review phase of the SDLC by reviewing implemented code against requirements, architecture, and best practices.

## SDLC Phase

**Phase 6: Code Review**

## Agent

Uses `.claude/agents/review-agent.md`

## Inputs Required

- `requirements.md` - Approved requirements
- `architecture.md` - Approved architecture
- `design-review.md` - Design review results
- `impl-plan.md` - Implementation plan
- `implementation.md` - Implementation documentation
- `index.html`, `styles.css`, `app.js` - Application files
- `tests/todo.unit.test.js`, `tests/todo.integration.test.js` - Test files
- `CLAUDE.md` - Project overview
- `Instructions/instructions.md` - Project instructions

## Expected Output

Creates or updates `code-review.md` with:
- Correctness review
- Requirements compliance (FR, NFR, AC)
- Architecture compliance
- Security review (XSS prevention)
- Error handling review
- Test coverage review
- Code clarity and maintainability review
- DRY principle review
- Dependency safety review
- Scope compliance review
- Findings with severity levels
- Fixes applied (if any)
- Final decision (APPROVED / APPROVED WITH CHANGES)

## Important Constraints

- **Focus**: Identify genuine implementation defects only
- **Severity**: Critical, High, Medium, Low, Informational
- **Scope Protection**: Flag unauthorized features
- **Requirements**: Verify ALL requirements satisfied
- **Security**: Verify XSS prevention via textContent

## Execution

To execute this skill, the agent must:
1. Read all input files
2. Follow the detailed instructions in `.claude/agents/review-agent.md`
3. Review all application and test code
4. Document findings with appropriate severity
5. Apply fixes if needed
6. Create/update `code-review.md`
7. Report final decision

## Usage

Invoke as: `/review` or via Skills system
