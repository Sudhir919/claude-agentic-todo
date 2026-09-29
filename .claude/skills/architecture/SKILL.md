---
name: architecture
description: Execute Architecture phase - design system architecture for approved requirements
---

# Architecture Skill

## Purpose

Execute the Architecture phase of the SDLC by designing the system architecture that satisfies all approved requirements.

## SDLC Phase

**Phase 2: Architecture**

## Agent

Uses `.claude/agents/architecture-agent.md`

## Inputs Required

- `requirements.md` - Approved requirements
- `CLAUDE.md` - Project overview
- `Instructions/instructions.md` - Project instructions
- `user_story.md` - Original user story

## Expected Output

Creates or updates `architecture.md` with:
- System overview
- Three-layer architecture (Persistence, Application Logic, Presentation)
- Data model specification
- Component design
- Technology stack
- Persistence strategy (localStorage)
- Validation approach
- Security measures (XSS prevention)
- Testing strategy

## Important Constraints

- **Architecture**: Three layers with clear separation of concerns
- **Persistence**: localStorage with key "todo-items"
- **Rendering**: Safe rendering using textContent (never innerHTML)
- **Data Model**: {title: string, completed: boolean} only
- **Technology**: Vanilla JavaScript (no frameworks)

## Execution

To execute this skill, the agent must:
1. Read all input files
2. Follow the detailed instructions in `.claude/agents/architecture-agent.md`
3. Create/update `architecture.md`
4. Ensure 100% requirements coverage
5. Report completion

## Usage

Invoke as: `/architecture` or via Skills system
