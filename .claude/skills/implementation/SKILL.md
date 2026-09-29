---
name: implementation
description: Execute Implementation phase - create application and test files per approved plan
---

# Implementation Skill

## Purpose

Execute the Implementation phase of the SDLC by creating all application and test files according to the approved implementation plan.

## SDLC Phase

**Phase 5: Implementation**

## Agent

Uses `.claude/agents/implementation-agent.md`

## Inputs Required

- `requirements.md` - Approved requirements
- `architecture.md` - Approved architecture
- `design-review.md` - Design review results
- `impl-plan.md` - Implementation plan
- `CLAUDE.md` - Project overview
- `Instructions/instructions.md` - Project instructions

## Expected Output

Creates:
- `index.html` - Semantic HTML structure
- `styles.css` - Professional styling
- `app.js` - Three-layer JavaScript application
- `tests/todo.unit.test.js` - Unit tests (37+ tests)
- `tests/todo.integration.test.js` - Integration tests (14+ tests)
- `implementation.md` - Implementation documentation

Executes:
- `node --check app.js` - Syntax validation
- `node --test tests/*.test.js` - Test suite (all must pass)

## Important Constraints

- **Architecture**: Three layers (Persistence, Application Logic, Presentation)
- **Testing**: Minimum 51 tests, all passing
- **Security**: XSS prevention via textContent
- **Data Model**: {title: string, completed: boolean} only
- **Update Behavior**: Modify existing todo (no duplicate)
- **Cancel Behavior**: Restore original (no persistence)
- **Technology**: Vanilla JavaScript, Node.js test runner

## Execution

To execute this skill, the agent must:
1. Read all input files
2. Follow the detailed instructions in `.claude/agents/implementation-agent.md`
3. Create all application files
4. Create all test files
5. Run syntax check and tests
6. Create `implementation.md`
7. Verify 100% requirements coverage
8. Report test results

## Usage

Invoke as: `/implementation` or via Skills system
