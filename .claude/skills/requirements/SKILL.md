---
name: requirements
description: Execute Requirements phase - analyze user story and create structured requirements
---

# Requirements Skill

## Purpose

Execute the Requirements phase of the SDLC by analyzing the user story and creating structured, testable requirements documentation.

## SDLC Phase

**Phase 1: Requirements**

## Agent

Uses `.claude/agents/requirements-agent.md`

## Inputs Required

- `user_story.md` - User story describing application needs
- `CLAUDE.md` - Project overview and scope
- `Instructions/instructions.md` - Detailed project instructions

## Expected Output

Creates or updates `requirements.md` with:
- Functional Requirements (FR-001 through FR-011)
- Non-Functional Requirements (NFR-001 through NFR-006)
- Acceptance Criteria (AC-001 through AC-013)
- Scope exclusions

## Important Constraints

- **Data Model**: Todo contains only `title` and `completed` fields
- **Technology**: HTML, CSS, Vanilla JavaScript, localStorage only
- **Scope**: Add, View, Edit, Update, Cancel, Complete, Incomplete, Delete operations only
- **No unauthorized features**: No backend, database, authentication, frameworks, search, filtering, sorting, priorities, categories, tags, due dates, descriptions

## Execution

To execute this skill, the agent must:
1. Read all input files
2. Follow the detailed instructions in `.claude/agents/requirements-agent.md`
3. Create/update `requirements.md`
4. Verify no scope creep
5. Report completion

## Usage

Invoke as: `/requirements` or via Skills system
