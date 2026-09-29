# Claude Agentic Todo

## Project Purpose

This project demonstrates an AI-assisted software development lifecycle using Claude Code.

The project will build a simple browser-based Todo List application while demonstrating the complete SDLC:

1. Requirements
2. Architecture
3. Design Review
4. Implementation Planning
5. Implementation
6. Code Review
7. Verification
8. Pull Request

## Application Goal

Build a simple Todo List application that allows a user to:

- Add a Todo
- View Todos
- Edit a Todo
- Delete a Todo
- Mark a Todo as completed or incomplete

The application must be simple and easy for a normal user to understand.

## Application Scope

The application is:

- Browser-based
- Single-user
- No authentication
- No user accounts
- No backend
- No database
- Persistent across browser sessions

Todos must contain only:

- Title
- Completion status

## Technology

Use:

- HTML
- CSS
- JavaScript
- Browser localStorage

Do not introduce unnecessary frameworks, libraries, backend services, databases, or advanced features.

## User Experience

The UI must make the main actions obvious:

- Add
- Edit
- Save
- Cancel
- Delete
- Complete / Uncomplete

Avoid complicated workflows and unnecessary UI elements.

## Development Rules

- Follow the approved requirements and architecture.
- Do not add functionality outside the agreed scope.
- Prefer simple and maintainable solutions.
- Keep application logic understandable.
- Use clear naming.
- Validate user input.
- Handle invalid or missing data safely.
- Escape user-provided content when rendering HTML.
- Preserve existing functionality when making changes.
- Do not make unrelated changes.

## Testing

Every implementation change must be verified with appropriate tests.

The final project must include:

- Unit tests
- Integration-style tests
- Evidence that the complete test suite passes

## SDLC Artifacts

Maintain these project artifacts:

- `user_story.md`
- `requirements.md`
- `architecture.md`
- `design-review.md`
- `impl-plan.md`
- `implementation.md`
- `code-review.md`
- `verification-report.md`
- `pr.md`
- `CHANGELOG.md`

## Git Rules

Use Git for version control.

Create clear, meaningful commits.

Do not merge the final Pull Request automatically.

The final Pull Request must contain:

- Summary
- Changes Made
- Test Evidence
- Known Limitations
- Reviewer Checklist

## Important Constraint

Do not implement the application before the requirements, architecture, design review, and implementation plan have been completed and approved.

Follow the SDLC phases in order.
