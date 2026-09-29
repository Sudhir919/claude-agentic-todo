# Architecture

## 1. Architecture Overview

The Todo List application follows a simple three-layer browser-based architecture. The application runs entirely in the user's browser with no backend server, database, or external API dependencies. The architecture consists of:

```
Browser UI (Presentation Layer)
         ↓
Application Logic Layer
         ↓
localStorage Persistence Layer
```

**Presentation Layer**: Renders the user interface including the Todo input form, Todo list display, edit controls, and action buttons.

**Application Logic Layer**: Manages Todo operations (add, edit, update, cancel, complete, delete), validation, normalization, safe rendering, and coordinates persistence.

**Persistence Layer**: Handles saving and loading Todos using browser localStorage to ensure data persists across browser refresh and reopen.

This architecture supports a single-user, browser-based Todo application with no authentication, user accounts, or multi-user capabilities. The design emphasizes simplicity, maintainability, and clear separation of responsibilities.

## 2. Architecture Goals

The architecture is designed to achieve the following goals:

**Simplicity**: Use the minimum viable technology stack and components necessary to satisfy requirements. Avoid unnecessary frameworks, libraries, and abstractions.

**Maintainability**: Organize code with clear separation of concerns. Use descriptive naming and straightforward logic that future developers can easily understand and modify.

**Clear Separation of Responsibilities**: Define distinct layers for presentation, application logic, and persistence. Each layer has well-defined responsibilities without overlap.

**Minimal Dependencies**: Use only vanilla HTML, CSS, and JavaScript with no external frameworks or libraries. Rely on standard browser APIs for localStorage persistence.

**Persistence Across Browser Sessions**: Ensure Todos persist when the user refreshes the browser or closes and reopens it. Use localStorage as the single persistence mechanism.

**Safe User Input Handling**: Validate user input to reject empty or whitespace-only titles. Normalize input before storage. Safely render user-entered content to prevent XSS vulnerabilities.

**Testability**: Design application logic to be testable through unit tests and integration-style tests. Support automated testing using Node.js built-in test runner.

## 3. Technology Stack

The application uses the following technology stack:

| Technology | Purpose | Rationale |
|------------|---------|-----------|
| **HTML** | Markup structure for the user interface | Standard web technology, no additional dependencies required |
| **CSS** | Styling and visual presentation | Standard web technology, sufficient for simple UI requirements |
| **Vanilla JavaScript** | Application logic, DOM manipulation, event handling | Standard language, no framework overhead, meets all functional requirements |
| **Browser localStorage** | Client-side data persistence | Built-in browser API, sufficient for single-user local storage requirements |
| **Node.js built-in test runner** | Automated testing | Built into Node.js, no additional test framework dependencies required |

**Explicitly Excluded Technologies**:
- No JavaScript frameworks (React, Angular, Vue)
- No backend services or server-side logic
- No database systems
- No authentication systems
- No external APIs or third-party services
- No build systems or bundlers (unless proven necessary later)
- No state management libraries

## 4. Application Components

### Presentation Layer

The Presentation Layer is responsible for all user interface elements and user interactions.

**Responsibilities**:
- Display Todo input form for adding new Todos
- Display the Todo list showing all existing Todos
- Provide edit interface for modifying existing Todos
- Provide Update button/action to save edited changes
- Provide Cancel button/action to discard edits
- Provide Complete/incomplete checkbox to toggle Todo status
- Provide Delete button/action to remove Todos
- Display user feedback (validation errors, empty states)

**Implementation**: Rendered in `index.html` and styled with `styles.css`. JavaScript in `app.js` manipulates the DOM to update the display.

### Application Logic Layer

The Application Logic Layer contains all business logic for managing Todos.

**Responsibilities**:
- Add new Todo to the Todo list
- View and render all Todos to the presentation layer
- Enable editing mode for an existing Todo
- Update an existing Todo with modified title (must not create duplicate)
- Cancel edit and restore original Todo state
- Toggle Todo completion status (complete/incomplete)
- Delete Todo from the Todo list
- Validate Todo titles (reject empty or whitespace-only)
- Normalize Todo titles (trim whitespace)
- Safely render user-entered content to prevent XSS
- Coordinate persistence operations with the Persistence Layer

**Implementation**: Implemented in `app.js` as JavaScript functions managing Todo state and operations.

### Persistence Layer

The Persistence Layer handles all data storage and retrieval using browser localStorage.

**Responsibilities**:
- Save Todos to localStorage after every modification
- Load Todos from localStorage on application startup
- Handle empty storage state (first-time users)
- Preserve Todos across browser refresh and reopen
- Serialize Todo data to JSON for storage
- Deserialize JSON data back to Todo objects

**Implementation**: Implemented as persistence functions in `app.js` using the browser's localStorage API with a single clear key.

## 5. Component Responsibilities

| Component | Responsibility |
|-----------|----------------|
| **Presentation Layer** | Render UI, capture user input, display Todos, show validation feedback |
| **Application Logic Layer** | Manage Todo CRUD operations, validate input, normalize data, safe rendering, coordinate persistence |
| **Persistence Layer** | Save Todos to localStorage, load Todos from localStorage, handle serialization/deserialization |
| **Todo Input Form** | Capture new Todo title from user |
| **Todo List Display** | Render all existing Todos with their titles and completion status |
| **Edit Interface** | Allow user to modify existing Todo title |
| **Update Action** | Save changes to edited Todo |
| **Cancel Action** | Discard changes and restore original Todo state |
| **Complete/Incomplete Checkbox** | Toggle Todo completion status |
| **Delete Action** | Remove Todo from list and localStorage |
| **Validation Logic** | Reject empty or whitespace-only titles |
| **Normalization Logic** | Trim whitespace from titles before storage |
| **Safe Rendering Logic** | Prevent XSS by safely rendering user content |

## 6. Data Model

The Todo data model is intentionally minimal and contains exactly two fields:

```javascript
{
  "title": "string",      // The Todo item's text content
  "completed": "boolean"  // true if completed, false if incomplete
}
```

**Field Specifications**:

**title** (string):
- Contains the user-entered Todo text
- Must not be empty or whitespace-only
- Should be trimmed of leading/trailing whitespace before storage
- Must be safely rendered to prevent XSS

**completed** (boolean):
- `false` when Todo is created (default state)
- `true` when user marks Todo as completed
- Can be toggled between `true` and `false`

**Explicitly Excluded Fields**:

The architecture explicitly prohibits adding the following fields to maintain simplicity:
- `id` (identification number or unique identifier)
- `priority` (priority level or ranking)
- `category` (category or grouping)
- `tags` (keywords or labels)
- `due_date` (deadline or due date)
- `description` (additional text or notes)
- `user` or `account` information (owner or creator)
- `created_at` or `updated_at` timestamps
- Any other metadata fields

## 7. Data Flow

### Application Startup

```
Browser loads index.html
    ↓
JavaScript initializes (app.js loaded)
    ↓
Persistence Layer reads localStorage using key "todo-items"
    ↓
Parse JSON data (or handle empty storage)
    ↓
Application Logic validates/normalizes loaded data if needed
    ↓
Presentation Layer renders Todo list to the DOM
```

### Add Todo

```
User enters title in input form
    ↓
User submits (click Add button or press Enter)
    ↓
Application Logic receives input
    ↓
Validate title (reject if empty or whitespace-only)
    ↓
If invalid: Display validation error → STOP
    ↓
If valid: Normalize title (trim whitespace)
    ↓
Create new Todo object: { title: normalizedTitle, completed: false }
    ↓
Add Todo to in-memory Todo array
    ↓
Persistence Layer saves updated array to localStorage
    ↓
Presentation Layer re-renders Todo list
    ↓
Clear input form for next entry
```

### Edit Todo

```
User clicks Edit button for existing Todo
    ↓
Application Logic enters edit mode for that Todo
    ↓
Original Todo data is preserved for potential cancellation
    ↓
Presentation Layer displays edit interface with current title
    ↓
User can modify title in edit field
    ↓
User can choose Update or Cancel
```

### Update Todo

```
User modifies title in edit field
    ↓
User clicks Update button
    ↓
Application Logic receives modified title
    ↓
Validate title (reject if empty or whitespace-only)
    ↓
If invalid: Display validation error → remain in edit mode
    ↓
If valid: Normalize title (trim whitespace)
    ↓
Update the EXISTING Todo object with new title
    ↓
**IMPORTANT**: Do NOT create duplicate Todo
    ↓
Persistence Layer saves updated array to localStorage
    ↓
Exit edit mode
    ↓
Presentation Layer re-renders Todo list
```

### Cancel Edit

```
User clicks Cancel button during editing
    ↓
Application Logic discards pending changes
    ↓
Restore original Todo state from preserved data
    ↓
Exit edit mode
    ↓
Presentation Layer re-renders Todo list (no changes persisted)
```

### Complete/Incomplete

```
User clicks checkbox to toggle completion status
    ↓
Application Logic updates Todo.completed value
    ↓
If currently false → set to true (mark completed)
    ↓
If currently true → set to false (mark incomplete)
    ↓
Persistence Layer saves updated array to localStorage
    ↓
Presentation Layer re-renders Todo list with updated status
```

### Delete

```
User clicks Delete button for existing Todo
    ↓
Application Logic identifies Todo to remove
    ↓
Remove Todo from in-memory Todo array
    ↓
Persistence Layer saves updated array to localStorage
    ↓
Presentation Layer re-renders Todo list (deleted Todo no longer visible)
```

## 8. Persistence

### localStorage Implementation

The application uses browser localStorage as its sole persistence mechanism. localStorage is a synchronous, key-value storage API built into modern browsers that persists data across browser sessions.

**localStorage Key**: `todo-items`

The application uses a single, clearly named localStorage key to store all Todo items.

### Data Serialization

**Saving Todos**:
1. Serialize the in-memory Todo array to JSON string using `JSON.stringify()`
2. Store the JSON string in localStorage under key `todo-items`
3. Example: `localStorage.setItem('todo-items', JSON.stringify(todosArray))`

**Loading Todos**:
1. Retrieve the JSON string from localStorage using key `todo-items`
2. Parse the JSON string back to JavaScript array using `JSON.parse()`
3. Example: `JSON.parse(localStorage.getItem('todo-items'))`

### Empty Storage Handling

When the application starts and no data exists in localStorage:
1. `localStorage.getItem('todo-items')` returns `null`
2. Application Logic initializes an empty array `[]`
3. Presentation Layer displays empty state (no Todos to show)
4. User can add first Todo normally

### Persistence Behavior

**Browser Refresh**: When the user refreshes the page (F5, Ctrl+R), the application reloads, reads localStorage, and restores all Todos with their correct titles and completion status.

**Browser Close and Reopen**: When the user closes the browser and reopens it later, localStorage data persists. The application loads and displays all previously saved Todos.

**Data Integrity**: Every Add, Update, Complete/Incomplete, and Delete operation immediately saves the updated Todo array to localStorage, ensuring data is always current.

### Persistence Constraints

- localStorage is specific to the browser and origin (protocol + domain + port)
- Todos are not synchronized across different browsers or devices
- Todos are not synchronized across different user profiles in the same browser
- localStorage has storage limits (typically 5-10MB), sufficient for thousands of simple Todos
- No backend synchronization or cloud backup

## 9. Validation and Safe Rendering

### Validation Rules

The application implements the following validation rules for Todo titles:

**Empty Title Rejection**:
- Reject titles that are empty strings (`""`)
- Display appropriate validation error message
- Do not add or update Todo with empty title

**Whitespace-Only Rejection**:
- Reject titles that contain only whitespace characters (spaces, tabs, newlines)
- Example: `"   "`, `"\t"`, `"\n"` are all invalid
- Display appropriate validation error message
- Do not add or update Todo with whitespace-only title

**Validation Points**:
- Validate when adding new Todo
- Validate when updating existing Todo
- Provide clear feedback to user when validation fails

### Normalization

**Title Trimming**:
- Trim leading and trailing whitespace from all Todo titles before storage
- Example: `"  Buy milk  "` becomes `"Buy milk"`
- Apply trimming after validation passes
- Apply trimming before saving to localStorage

**Normalization Points**:
- Normalize when adding new Todo
- Normalize when updating existing Todo

### Safe Rendering

**XSS Prevention**:

User-entered Todo titles may contain special HTML characters or script content. The application must safely render this content to prevent Cross-Site Scripting (XSS) vulnerabilities.

**Safe Rendering Approach**:
- Use DOM APIs that treat content as text, not HTML
- Preferred: `element.textContent = todoTitle` (treats content as plain text)
- Avoid: `element.innerHTML = todoTitle` (interprets content as HTML - dangerous)
- Ensure user-entered content cannot be interpreted as HTML markup or JavaScript

**Example**:
- User enters title: `<script>alert('XSS')</script>`
- Safe rendering displays: `<script>alert('XSS')</script>` as visible text
- Unsafe rendering would execute the script (vulnerability)

**Application of Safe Rendering**:
- Render all Todo titles using text-safe methods
- Apply safe rendering when displaying Todo list
- Apply safe rendering when displaying edit interface

## 10. Testing Architecture

### Testing Strategy

The application uses a two-level testing strategy:
1. **Unit Tests**: Test individual application logic functions in isolation
2. **Integration-Style Tests**: Test complete workflows involving multiple components

### Test Technology

**Node.js built-in test runner**: The application uses the native test runner built into Node.js (available in Node.js 18+). This eliminates the need for external test framework dependencies like Jest or Mocha.

**Key Features**:
- Built-in `node:test` module
- Assertion library via `node:assert`
- No additional npm dependencies required
- Simple, straightforward test syntax

### Unit Tests

**Purpose**: Verify individual application logic functions work correctly in isolation.

**Test Coverage**:

1. **Validation Logic**:
   - Reject empty title
   - Reject whitespace-only title
   - Accept valid title

2. **Normalization Logic**:
   - Trim leading whitespace
   - Trim trailing whitespace
   - Trim both leading and trailing whitespace

3. **Todo Creation**:
   - Create Todo with valid title
   - Set completed to false by default
   - Do not create Todo with invalid title

4. **Todo Update Behavior**:
   - Update existing Todo title
   - Do not create duplicate Todo
   - Preserve completion status when updating title

5. **Completion State**:
   - Mark Todo as completed (false → true)
   - Mark Todo as incomplete (true → false)
   - Toggle completion status correctly

6. **Deletion Behavior**:
   - Remove Todo from array
   - Do not affect other Todos
   - Handle deletion when array has one item
   - Handle deletion when array has multiple items

7. **Persistence Logic** (where practical):
   - Serialize Todos to JSON
   - Deserialize JSON to Todos
   - Handle empty storage
   - Handle invalid JSON gracefully

**Test File**: `tests/todo.unit.test.js`

### Integration-Style Tests

**Purpose**: Verify complete workflows involving multiple components working together.

**Test Coverage**:

1. **Add and Display**:
   - Add Todo → verify it appears in rendered list
   - Add multiple Todos → verify all appear
   - Attempt to add invalid Todo → verify validation error and no addition

2. **Edit and Update**:
   - Edit existing Todo → update title → verify update persisted
   - Edit existing Todo → update title → verify no duplicate created
   - Edit existing Todo → attempt invalid title → verify validation error

3. **Cancel Edit**:
   - Edit existing Todo → modify title → cancel → verify original unchanged
   - Verify canceled changes are not persisted

4. **Complete/Incomplete**:
   - Mark incomplete Todo as completed → verify status changed
   - Mark completed Todo as incomplete → verify status changed
   - Verify completion changes are persisted

5. **Delete**:
   - Delete Todo → verify it no longer appears
   - Delete Todo → verify other Todos unaffected
   - Verify deletion is persisted

6. **Persistence Behavior**:
   - Add Todo → simulate reload → verify Todo still exists
   - Update Todo → simulate reload → verify update persisted
   - Complete Todo → simulate reload → verify status persisted
   - Delete Todo → simulate reload → verify deletion persisted

**Test File**: `tests/todo.integration.test.js`

### Testing Approach

**DOM Testing**: Since the application manipulates the DOM, integration tests may need to simulate a DOM environment. Options include:
- Using JSDOM (lightweight DOM implementation for Node.js)
- Extracting testable application logic into pure functions
- Testing logic separately from DOM rendering

**Browser Automation**: The architecture does not require Selenium, Puppeteer, or Playwright unless requirements explicitly demand browser-based end-to-end testing later.

**Test Execution**: Tests are executed using the Node.js test runner:
```bash
node --test tests/
```

## 11. Project Structure

The project follows a simple, flat structure appropriate for a small single-page application:

```
claude-agentic-todo/
├── CLAUDE.md                     # Project instructions for Claude Code
├── user_story.md                 # User story defining application goals
├── Instructions/
│   └── instructions.md           # Detailed project instructions
├── .claude/
│   ├── agents/
│   │   ├── requirements-agent.md     # Requirements Agent definition
│   │   ├── architecture-agent.md     # Architecture Agent definition
│   │   ├── design-agent.md           # Design Review Agent definition
│   │   ├── planning-agent.md         # Implementation Planning Agent definition
│   │   ├── implementation-agent.md   # Implementation Agent definition
│   │   ├── review-agent.md           # Code Review Agent definition
│   │   ├── verify-agent.md           # Verification Agent definition
│   │   └── pr-agent.md               # PR Preparation Agent definition
│   ├── skills/
│   │   ├── requirements/SKILL.md     # Requirements Skill definition
│   │   ├── architecture/SKILL.md     # Architecture Skill definition
│   │   ├── design/SKILL.md           # Design Review Skill definition
│   │   ├── planning/SKILL.md         # Planning Skill definition
│   │   ├── implementation/SKILL.md   # Implementation Skill definition
│   │   ├── review/SKILL.md           # Code Review Skill definition
│   │   ├── verify/SKILL.md           # Verification Skill definition
│   │   └── pr/SKILL.md               # PR Skill definition
│   ├── hooks/
│   │   ├── validate-js.js            # JavaScript syntax validation hook
│   │   └── README.md                 # Hook documentation
│   └── settings.json             # Claude Code project settings
├── Prompts/
│   ├── requirements.prompt.md    # Requirements phase execution prompt
│   ├── architecture.prompt.md    # Architecture phase execution prompt
│   ├── design.prompt.md          # Design Review phase execution prompt
│   ├── planning.prompt.md        # Planning phase execution prompt
│   ├── implementation.prompt.md  # Implementation phase execution prompt
│   ├── review.prompt.md          # Code Review phase execution prompt
│   ├── verify.prompt.md          # Verification phase execution prompt
│   └── pr.prompt.md              # PR Preparation phase execution prompt
├── requirements.md               # Functional and non-functional requirements
├── architecture.md               # This document - application architecture
├── design-review.md              # Design review findings
├── impl-plan.md                  # Implementation plan
├── implementation.md             # Implementation notes
├── code-review.md                # Code review findings
├── verification-report.md        # Verification test results
├── pr.md                         # Pull request description
├── CHANGELOG.md                  # Project change log
├── TOOLING_SUMMARY.md            # Tooling consolidation summary
├── index.html                    # Main HTML file (application entry point)
├── styles.css                    # CSS styles for the UI
├── app.js                        # JavaScript application logic
└── tests/
    ├── todo.unit.test.js         # Unit tests for application logic
    └── todo.integration.test.js  # Integration-style tests for workflows
```

**Application Files**:
- `index.html`: HTML structure for the Todo application UI
- `styles.css`: CSS styling for visual presentation
- `app.js`: JavaScript containing all application logic and persistence
- `tests/todo.unit.test.js`: Unit tests
- `tests/todo.integration.test.js`: Integration-style tests

**SDLC Artifacts**:
- Requirements phase: `requirements.md`
- Architecture phase: `architecture.md` (this document)
- Design Review phase: `design-review.md` (future)
- Implementation Planning phase: `impl-plan.md` (future)
- Implementation phase: `implementation.md` (future)
- Code Review phase: `code-review.md` (future)
- Verification phase: `verification-report.md` (future)
- Pull Request phase: `pr.md` (future)

**Agent Definitions**: Stored in `Agents/` directory for reusable SDLC automation.

## 12. Architecture Decisions

### Decision 1: Vanilla HTML/CSS/JavaScript

**Decision**: Use vanilla HTML, CSS, and JavaScript with no frameworks.

**Rationale**:
- Requirements specify a simple Todo application with basic CRUD operations
- No requirement justifies framework complexity (React, Angular, Vue)
- Vanilla JavaScript is sufficient for DOM manipulation, event handling, and localStorage
- Zero framework dependencies reduces complexity, build steps, and learning curve
- Faster initial load time and smaller payload
- Easier for developers unfamiliar with frameworks to understand and maintain

**Traceoff**: Manual DOM manipulation requires more code than declarative frameworks. However, the application's simplicity makes this acceptable.

### Decision 2: localStorage for Persistence

**Decision**: Use browser localStorage as the sole persistence mechanism.

**Rationale**:
- Requirements specify browser-based, single-user application with no backend
- Requirements specify persistence across browser refresh and reopen
- localStorage is built into all modern browsers (no dependencies)
- localStorage is synchronous and simple to use
- localStorage provides sufficient storage capacity for Todo data
- Requirements explicitly exclude backend, database, and authentication

**Tradeoff**: Data is not synchronized across browsers or devices. This is acceptable because requirements specify single-user, single-browser scope.

### Decision 3: Minimal Todo Data Model

**Decision**: Limit Todo data model to only `title` and `completed` fields.

**Rationale**:
- Requirements explicitly define Todo data model as title and completion status only
- Project instructions explicitly prohibit id, priority, category, tags, due date, description
- Minimal model reduces complexity and storage requirements
- Minimal model satisfies all functional requirements without extra features

**Tradeoff**: Future feature additions (e.g., categories, priorities) would require data model changes. This is acceptable because requirements prioritize simplicity and scope protection.

### Decision 4: Simple Layered Architecture

**Decision**: Use a three-layer architecture (Presentation, Application Logic, Persistence).

**Rationale**:
- Clear separation of concerns improves maintainability
- Each layer has well-defined responsibilities
- Testable: Application Logic can be tested independently
- Simple enough for small application, structured enough to prevent spaghetti code
- Follows standard architectural patterns without over-engineering

**Tradeoff**: More layers than a single-file script, but the separation improves code organization.

### Decision 5: Node.js Built-in Test Runner

**Decision**: Use Node.js built-in test runner instead of Jest, Mocha, or other frameworks.

**Rationale**:
- Requirements emphasize simplicity and minimal dependencies
- Node.js built-in test runner (available in Node 18+) eliminates need for external test frameworks
- Sufficient for unit tests and integration-style tests
- Reduces npm dependencies and package.json complexity
- Fast execution and simple syntax

**Tradeoff**: Fewer features than mature frameworks like Jest (no snapshot testing, limited mocking). This is acceptable for the application's testing needs.

### Decision 6: No Backend or Database

**Decision**: Do not implement backend server, database, or API.

**Rationale**:
- Requirements explicitly specify browser-based application with no backend
- Requirements specify single-user, local storage using localStorage
- Requirements explicitly exclude authentication, user accounts, and multi-user features
- Eliminates server infrastructure, deployment complexity, and backend dependencies

**Tradeoff**: No cross-device synchronization or multi-user capabilities. This is intentional per requirements.

### Decision 7: No Build System (Initially)

**Decision**: Do not introduce build systems, bundlers, or transpilers unless proven necessary.

**Rationale**:
- Modern browsers support ES6+ JavaScript natively
- Application is simple enough to avoid bundling complexity
- No TypeScript, JSX, or other transpilation requirements
- Reduces development tooling and configuration overhead

**Tradeoff**: If the application grows complex, a build system might improve developer experience. This can be added later if needed.

## 13. Scope and Constraints

### In Scope

The architecture supports the following approved functionality:
- Add Todo with title validation
- View all Todos in a list
- Edit existing Todo title
- Update edited Todo (must modify existing, not create duplicate)
- Cancel edit without saving changes
- Mark Todo as completed
- Mark completed Todo as incomplete
- Delete Todo
- Persist Todos using localStorage across browser sessions
- Validate and normalize user input
- Safe rendering to prevent XSS

### Out of Scope

The architecture explicitly excludes the following functionality to maintain simplicity:

**User Management & Authentication**:
- User login or authentication
- User accounts or profiles
- Multiple users
- User permissions or roles

**Backend & Infrastructure**:
- Backend services or server-side logic
- Database systems (SQL, NoSQL)
- REST APIs or GraphQL
- External APIs or third-party integrations
- Cloud services or hosting configuration

**Frameworks & Libraries**:
- React, Angular, Vue, or other JavaScript frameworks
- State management libraries (Redux, MobX, Zustand)
- UI component libraries
- Build systems or bundlers (unless proven necessary)

**Advanced Todo Features**:
- Search functionality
- Filtering Todos by status or criteria
- Sorting Todos by date, title, or priority
- Todo priorities or priority levels
- Todo categories or grouping
- Tags or labels for Todos
- Due dates or scheduling
- Todo descriptions or additional text fields
- Subtasks or nested Todos
- Recurring Todos

**Advanced UI Features**:
- Notifications or alerts
- Dashboards or analytics
- Advanced settings or configuration pages
- Custom themes or theming system
- Extensive animations or transitions
- Drag-and-drop reordering
- Keyboard shortcuts (beyond standard form behavior)

**Data Management**:
- Data export or import features
- Undo or redo functionality
- Backup or restore functionality
- Data synchronization across devices
- Collaboration or sharing features

**Platform Extensions**:
- Mobile-specific optimizations beyond basic responsive design
- Native mobile apps
- Desktop applications
- Browser extensions

### Constraints

**Technology Constraints**:
- Must use vanilla HTML, CSS, and JavaScript only
- Must use browser localStorage for persistence
- Must use Node.js built-in test runner for testing
- No JavaScript frameworks allowed
- No backend or database allowed

**Data Model Constraints**:
- Todo must contain only `title` (string) and `completed` (boolean)
- No additional fields allowed

**Scope Constraints**:
- Single-user application only
- Browser-based operation only
- No authentication or user accounts
- No cross-device or cross-browser synchronization

**Simplicity Constraints**:
- Keep implementation simple and maintainable
- Avoid unnecessary abstractions or complexity
- Focus on core Todo functionality only

## 14. Requirements Traceability

This section maps functional requirements and acceptance criteria to the architectural components responsible for satisfying them.

| Requirement ID | Requirement Description | Architectural Component | Implementation Notes |
|----------------|-------------------------|-------------------------|----------------------|
| FR-001 | Add Todo | Application Logic + Presentation | User enters title → validate → normalize → create Todo → save → render |
| FR-002 | View Todo List | Presentation + Application Logic | Load from localStorage → render all Todos with status |
| FR-003 | Edit Existing Todo | Application Logic + Presentation | Enter edit mode → preserve original for cancel → display edit interface |
| FR-004 | Update Edited Todo | Application Logic + Persistence | Validate → normalize → update existing Todo (no duplicate) → save → render |
| FR-005 | Cancel Editing | Application Logic + Presentation | Discard changes → restore original state → exit edit mode |
| FR-006 | Mark Todo Completed | Application Logic + Persistence | Update completed to true → save → render |
| FR-007 | Mark Todo Incomplete | Application Logic + Persistence | Update completed to false → save → render |
| FR-008 | Delete Todo | Application Logic + Persistence | Remove from array → save → render |
| FR-009 | Title Validation | Application Logic | Reject empty or whitespace-only titles → display error |
| FR-010 | Data Persistence | Persistence Layer | Save/load using localStorage with key "todo-items" |
| FR-011 | Safe Content Rendering | Application Logic + Presentation | Use textContent (not innerHTML) to prevent XSS |
| NFR-001 | Simplicity | All Layers | Vanilla JS, no frameworks, minimal dependencies, flat structure |
| NFR-002 | Usability | Presentation Layer | Clear UI, obvious actions, validation feedback |
| NFR-003 | Technology Constraints | All Layers | HTML/CSS/vanilla JS only, localStorage only, no frameworks |
| NFR-004 | Maintainability | All Layers | Clear naming, logical organization, separation of concerns |
| NFR-005 | Data Model Constraints | Application Logic + Persistence | Only title and completed fields, no additional fields |
| NFR-006 | Single User Design | All Layers | No authentication, no multi-user support, local storage only |

### Acceptance Criteria Traceability

| Acceptance Criteria ID | Description | Architectural Support |
|------------------------|-------------|----------------------|
| AC-001 | User can add valid Todo | Add Todo flow (FR-001) + Validation (FR-009) + Persistence (FR-010) |
| AC-002 | User cannot add empty Todo | Validation logic (FR-009) rejects invalid input |
| AC-003 | User can view all Todos | View Todo List (FR-002) + Persistence (FR-010) |
| AC-004 | User can edit Todo | Edit Todo flow (FR-003) enters edit mode |
| AC-005 | User can save edited Todo | Update Todo flow (FR-004) + Validation (FR-009) + Persistence (FR-010) |
| AC-006 | User can cancel editing | Cancel Edit flow (FR-005) restores original state |
| AC-007 | User can mark Todo complete | Complete flow (FR-006) + Persistence (FR-010) |
| AC-008 | User can mark Todo incomplete | Incomplete flow (FR-007) + Persistence (FR-010) |
| AC-009 | User can delete Todo | Delete flow (FR-008) + Persistence (FR-010) |
| AC-010 | Todos persist after refresh | Persistence Layer (FR-010) loads from localStorage on startup |
| AC-011 | Todos persist after browser reopen | Persistence Layer (FR-010) - localStorage survives browser close |
| AC-012 | Edited Todo does not create duplicate | Update Todo flow (FR-004) modifies existing Todo in place |
| AC-013 | User content rendered safely | Safe Rendering (FR-011) uses textContent to prevent XSS |

### Component-to-Requirement Mapping

| Component | Supported Requirements |
|-----------|------------------------|
| **Presentation Layer** | FR-002, FR-003, FR-011, NFR-002, AC-003, AC-004, AC-013 |
| **Application Logic Layer** | FR-001, FR-003, FR-004, FR-005, FR-006, FR-007, FR-008, FR-009, FR-011, NFR-001, NFR-004, NFR-005 |
| **Persistence Layer** | FR-010, NFR-003, NFR-006, AC-010, AC-011 |
| **Validation Logic** | FR-009, AC-002, AC-005 |
| **Normalization Logic** | FR-009 (implicit) |
| **Safe Rendering Logic** | FR-011, AC-013 |
| **Todo Data Model** | NFR-005, all functional requirements implicitly |
| **Testing Architecture** | All requirements (ensures verification) |

This traceability demonstrates that every functional requirement, non-functional requirement, and acceptance criteria is supported by one or more architectural components, ensuring complete coverage of the approved requirements.

---

## Architecture Quality Gate

**Verification Checklist** (all items verified ✓):

✓ Architecture satisfies all approved requirements (FR-001 through FR-011, NFR-001 through NFR-006)  
✓ Every Todo operation (add, view, edit, update, cancel, complete, incomplete, delete) has an architectural path  
✓ Edit updates an existing Todo rather than creating a duplicate (Update Todo flow)  
✓ Cancel does not modify the Todo (Cancel Edit flow restores original state)  
✓ Completion can be toggled (Complete/Incomplete flows)  
✓ Delete removes the Todo (Delete flow)  
✓ localStorage provides persistence (Persistence Layer)  
✓ Data model contains only title and completed (Section 6)  
✓ Architecture is implementable using Vanilla JavaScript (Technology Stack)  
✓ Architecture does not introduce unnecessary technology (Scope and Constraints)  
✓ Testing is explicitly supported (Testing Architecture)  
✓ No application source code is created (architecture document only)  
✓ No design review is performed (Architecture phase only)  
✓ No implementation planning is performed (Architecture phase only)

**Architecture Phase Complete**
