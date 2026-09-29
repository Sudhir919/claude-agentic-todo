# Project Instructions

## 1. Project Purpose

This project demonstrates an AI-assisted software development lifecycle using Claude Code. The project showcases a complete SDLC from requirements gathering through architecture design, implementation planning, development, code review, verification, and pull request preparation. The goal is to demonstrate Claude Code's agentic capabilities throughout the software development process.

## 2. Application Scope

The application is a simple browser-based Todo application.

The user must be able to:
- Add a Todo
- View existing Todos
- Edit an existing Todo
- Update an edited Todo
- Cancel editing without changing the original Todo
- Mark a Todo completed
- Mark a completed Todo incomplete
- Delete a Todo

The application must remain simple and focused on these core capabilities.

## 3. Technology Constraints

Use:
- HTML
- CSS
- Vanilla JavaScript
- Browser localStorage

Do NOT introduce:
- React
- Angular
- Vue
- Backend services
- Database
- Authentication
- External APIs
- Unnecessary frameworks
- Unnecessary dependencies

## 4. Todo Data Model

A Todo contains only:
- title
- completed

Do not introduce unnecessary fields such as:
- id
- priority
- category
- tags
- due date
- description
- user/account information

## 5. Persistence

Todos must persist across browser refreshes and browser reopening using localStorage.

Use a single clear localStorage key.

## 6. Validation

Todo titles must not be empty or whitespace-only.

Input should be normalized appropriately before storage.

User-entered content must be rendered safely to prevent XSS vulnerabilities.

## 7. UI Principles

Keep the UI simple, clean, understandable, and functional.

Do not add unnecessary features such as:
- Search
- Filtering
- Sorting
- Notifications
- Authentication
- Dashboards
- Analytics
- Advanced settings
- Themes
- Unnecessary animations

The Todo list should be visible directly; a separate View button is not required.

Editing an existing Todo must modify that Todo rather than create a duplicate.

Cancel must restore the original state of the Todo being edited.

## 8. SDLC Rules

The project must follow this order:

1. Requirements
2. Architecture
3. Design Review
4. Implementation Planning
5. Implementation
6. Code Review
7. Verification
8. Pull Request Preparation

Do not skip a phase.

Do not implement application functionality before the requirements, architecture, design review, and implementation plan are completed.

Each phase must produce or update its corresponding project artifact.

## 9. Agent Rules

Agents must:
- Read relevant existing artifacts before making decisions
- Follow the user story and approved requirements
- Avoid unnecessary scope expansion
- Avoid changing unrelated files
- Preserve working functionality
- Clearly report what they changed
- Clearly report validation/test results
- Identify assumptions instead of silently inventing requirements

Agents must not:
- Overwrite previous decisions without justification
- Introduce features outside the approved scope
- Modify unrelated SDLC artifacts
- Create duplicate agents, skills, prompts, or hooks
- Create unnecessary files

## 10. Human Approval

Human approval is required between major SDLC phases when the workflow requires a decision or review.

Agents should prepare artifacts and recommendations but must not silently bypass the defined lifecycle.

## 11. Testing

Application changes must include appropriate tests.

The final project must contain:
- Unit tests
- Integration-style tests

Tests must verify the approved requirements and important user flows.

## 12. Git Rules

Use clear and meaningful commit messages.

Do not create unnecessary commits.

Do not rewrite or delete project history unless explicitly requested.

Do not merge a pull request automatically.

Do not create duplicate pull requests.

If an existing pull request exists for the project branch, update the existing pull request rather than creating another one.

## 13. Pull Request Requirements

The final pull request must contain:

### Summary
What the project implements.

### Changes Made
Important implementation and documentation changes.

### Test Evidence
Commands executed and their results.

### Known Limitations
Any genuine limitations that remain.

### Reviewer Checklist
A checklist covering:
- Requirements
- Implementation
- Tests
- Code quality
- Security/safety
- Documentation
- Verification

## 14. Scope Protection

The goal is a simple Todo application demonstrating Claude Code's Agentic SDLC capabilities.

Do not make the Todo application unnecessarily complex merely to demonstrate technology.

The SDLC automation and agent workflow are the main demonstration; the application itself should remain simple.

## 15. Artifact Consistency

The following artifacts must remain consistent with one another:
- user_story.md
- requirements.md
- architecture.md
- design-review.md
- impl-plan.md
- implementation.md
- code-review.md
- verification-report.md
- pr.md
- CHANGELOG.md

If an approved requirement changes, identify which downstream artifacts need updating.

## 16. Final Quality Gate

Before PR preparation, verify:
- Requirements are satisfied
- Implementation matches the approved architecture
- Tests pass
- No unnecessary functionality was added
- Documentation is consistent
- Working functionality was not broken
- The repository is ready for review
