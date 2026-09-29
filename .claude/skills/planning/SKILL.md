---
name: planning
description: Execute Planning phase - create dependency-ordered implementation plan
---

# Implementation Planning Skill

## Purpose

Execute the Implementation Planning phase of the SDLC by creating a dependency-ordered, testable implementation plan.

## SDLC Phase

**Phase 4: Implementation Planning**

## Agent

Uses `.claude/agents/planning-agent.md`

## Inputs Required

- `requirements.md` - Approved requirements
- `architecture.md` - Approved architecture
- `design-review.md` - Design review results
- `CLAUDE.md` - Project overview
- `Instructions/instructions.md` - Project instructions

## Expected Output

Creates or updates `impl-plan.md` with:
- Implementation phases
- Dependency-ordered tasks
- Task specifications with acceptance criteria
- Testing strategy
- Requirements traceability matrix
- Definition of done

## Important Constraints

- **Task Order**: Must respect dependencies (persistence before logic, logic before UI)
- **Testing**: Every feature must have corresponding tests
- **Traceability**: Every requirement must map to implementation tasks
- **Scope**: Only implement approved requirements

## Execution

To execute this skill, the agent must:
1. Read all input files
2. Follow the detailed instructions in `.claude/agents/planning-agent.md`
3. Create/update `impl-plan.md`
4. Ensure tasks are dependency-ordered
5. Verify 100% requirements traceability
6. Report completion

## Usage

Invoke as: `/planning` or via Skills system
