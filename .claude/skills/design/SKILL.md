---
name: design
description: Execute Design Review phase - review architecture against requirements
---

# Design Review Skill

## Purpose

Execute the Design Review phase of the SDLC by reviewing the proposed architecture against approved requirements.

## SDLC Phase

**Phase 3: Design Review**

## Agent

Uses `.claude/agents/design-agent.md`

## Inputs Required

- `requirements.md` - Approved requirements
- `architecture.md` - Proposed architecture
- `CLAUDE.md` - Project overview
- `Instructions/instructions.md` - Project instructions
- `user_story.md` - Original user story

## Expected Output

Creates or updates `design-review.md` with:
- Architecture review summary
- Requirements coverage analysis (FR, NFR, AC)
- Data model review
- CRUD operations review
- Persistence review
- Validation review
- Security review
- Testing strategy review
- Scope compliance review
- Findings (if any)
- Final decision (APPROVED / APPROVED WITH CHANGES / REJECTED)

## Important Constraints

- **Review Focus**: Verify architecture satisfies ALL requirements
- **Coverage**: Must verify 100% requirements traceability
- **Scope Protection**: Identify any scope creep in architecture
- **Decision**: Must be objective and justified

## Execution

To execute this skill, the agent must:
1. Read all input files
2. Follow the detailed instructions in `.claude/agents/design-agent.md`
3. Create/update `design-review.md`
4. Verify requirements coverage
5. Report final decision

## Usage

Invoke as: `/design` or via Skills system
