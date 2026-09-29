# Implementation Plan

## 1. Planning Summary

This implementation plan translates the approved requirements, architecture, and design review into a detailed, dependency-ordered set of implementation tasks. The plan guides the development of a simple browser-based Todo List application that allows users to add, view, edit, update, cancel editing, complete/uncomplete, and delete todo items with localStorage persistence.

**Planning Approach**: The plan uses a phased, dependency-driven approach where foundational tasks (project setup, core structure, data model) are completed first, followed by functionality implementation, and concluding with comprehensive testing and verification. Each task has clear acceptance criteria and testing expectations.

**Scope**: The plan covers only approved requirements (FR-001 through FR-011, NFR-001 through NFR-006, AC-001 through AC-013). No functionality outside the approved scope is included.

**Total Tasks**: 32 tasks organized into 8 phases

**Technology Stack**: HTML, CSS, Vanilla JavaScript, browser localStorage, Node.js built-in test runner

## 2. Implementation Strategy

### Phased Approach

The implementation follows a structured, phased approach:

**Phase 1: Project Setup** - Create project structure, directories, and initial files

**Phase 2: Core Application Structure** - Implement HTML structure and CSS styling to establish the UI foundation

**Phase 3: Data and Persistence Foundation** - Implement Todo data model and localStorage persistence functions

**Phase 4: Validation and Security** - Implement input validation, normalization, and safe rendering

**Phase 5: Todo Operations** - Implement all Todo CRUD operations (Add, View, Edit, Update, Cancel, Complete, Incomplete, Delete)

**Phase 6: Unit Testing** - Create unit tests for all application logic

**Phase 7: Integration Testing** - Create integration-style tests for complete user workflows

**Phase 8: Verification and Documentation** - Verify all requirements, create documentation, prepare for code review

### Dependency Management

Tasks are ordered so that:
- Setup completes before implementation
- Foundation (HTML, CSS, data model, persistence) completes before operations
- Validation and safe rendering complete before user-facing operations
- Application logic completes before testing
- Testing completes before verification

### Testing Strategy

Tests are implemented alongside or immediately after the logic they verify. Unit tests focus on individual functions. Integration-style tests verify complete user workflows. All tests use Node.js built-in test runner.

### Scope Protection

Every task is traced to approved requirements. No task introduces functionality outside the approved scope (no backend, database, authentication, frameworks, or advanced features).

## 3. Dependency-Ordered Tasks

### Phase 1: Project Setup

---

#### TASK-001

**Title**: Create Project Structure and Initialize Files

**Description**: Create the project directory structure and initialize all required files for the Todo application. Create empty HTML, CSS, and JavaScript files. Create tests directory.

**Dependencies**: None (first task)

**Files Affected**:
- `index.html` (create)
- `styles.css` (create)
- `app.js` (create)
- `tests/` (create directory)
- `tests/todo.unit.test.js` (create)
- `tests/todo.integration.test.js` (create)

**Requirements Covered**:
- NFR-001: Simplicity (flat structure)
- NFR-004: Maintainability (organized structure)

**Acceptance Criteria**:
- ✓ `index.html` file exists in project root
- ✓ `styles.css` file exists in project root
- ✓ `app.js` file exists in project root
- ✓ `tests/` directory exists
- ✓ `tests/todo.unit.test.js` file exists
- ✓ `tests/todo.integration.test.js` file exists
- ✓ All files are empty or contain minimal boilerplate

**Testing Expectations**: Verify files and directories exist with correct names and locations.

**Status**: Not Started

**Estimated Complexity**: Simple

---

### Phase 2: Core Application Structure

---

#### TASK-002

**Title**: Implement HTML Structure

**Description**: Create the HTML structure for the Todo application including the input form for adding Todos, the container for displaying the Todo list, and all necessary UI elements (input field, Add button, Todo list container). Use semantic HTML. Ensure structure supports all required operations (add, edit, update, cancel, complete, delete).

**Dependencies**: TASK-001

**Files Affected**:
- `index.html` (modify)

**Requirements Covered**:
- FR-002: View Todo List (provides container for display)
- NFR-001: Simplicity (simple HTML structure)
- NFR-002: Usability (clear structure)
- NFR-004: Maintainability (semantic HTML)

**Acceptance Criteria**:
- ✓ HTML includes `<!DOCTYPE html>` and proper structure
- ✓ HTML includes input field for Todo title
- ✓ HTML includes Add button
- ✓ HTML includes container element for Todo list
- ✓ HTML links to `styles.css`
- ✓ HTML links to `app.js`
- ✓ HTML uses semantic elements where appropriate
- ✓ No inline JavaScript or inline CSS

**Testing Expectations**: Verify HTML is valid and contains all required elements. Visual inspection confirms structure is present.

**Status**: Not Started

**Estimated Complexity**: Simple

---

#### TASK-003

**Title**: Implement CSS Styling

**Description**: Create CSS styles for the Todo application to make it clean, simple, and usable. Style the input form, Add button, Todo list, Todo items, edit interface, and action buttons. Ensure UI is clear and functional. Keep styling simple without unnecessary animations or complexity.

**Dependencies**: TASK-002

**Files Affected**:
- `styles.css` (modify)

**Requirements Covered**:
- NFR-001: Simplicity (simple, clean styling)
- NFR-002: Usability (clear, functional UI)
- NFR-004: Maintainability (organized CSS)

**Acceptance Criteria**:
- ✓ Input form is clearly visible and styled
- ✓ Add button is obvious and styled
- ✓ Todo list is clearly visible
- ✓ Todo items are distinguishable
- ✓ Completed Todos are visually distinct from incomplete Todos
- ✓ Edit mode is visually distinct
- ✓ Action buttons (Edit, Update, Cancel, Delete) are clearly styled
- ✓ Validation error messages are visually distinct
- ✓ No unnecessary animations or complexity

**Testing Expectations**: Visual inspection confirms UI is clean, simple, and usable. All elements are clearly visible and distinguishable.

**Status**: Not Started

**Estimated Complexity**: Simple

---

#### TASK-004

**Title**: Implement JavaScript Application Structure

**Description**: Create the basic JavaScript application structure in `app.js` following the three-layer architecture (Presentation, Application Logic, Persistence). Set up initialization code that runs when the page loads. Prepare function stubs for all major operations.

**Dependencies**: TASK-002

**Files Affected**:
- `app.js` (modify)

**Requirements Covered**:
- NFR-001: Simplicity (clear structure)
- NFR-004: Maintainability (organized code, separation of concerns)

**Acceptance Criteria**:
- ✓ JavaScript includes initialization function that runs on page load
- ✓ Code is organized into logical sections (Persistence, Application Logic, Presentation)
- ✓ Function stubs exist for major operations (add, render, edit, update, cancel, complete, delete)
- ✓ No global namespace pollution (use IIFE or module pattern if appropriate)
- ✓ Code uses clear, descriptive naming

**Testing Expectations**: Code runs without errors. Structure is clear and organized.

**Status**: Not Started

**Estimated Complexity**: Moderate

---

### Phase 3: Data and Persistence Foundation

---

#### TASK-005

**Title**: Implement Todo Data Model

**Description**: Define the Todo data model structure in JavaScript. Ensure Todo objects contain only `title` (string) and `completed` (boolean). Implement function to create new Todo objects with correct default values (completed = false).

**Dependencies**: TASK-004

**Files Affected**:
- `app.js` (modify)

**Requirements Covered**:
- NFR-005: Data Model Constraints (title and completed only)
- FR-001: Add Todo (defines structure)

**Acceptance Criteria**:
- ✓ Todo object structure is defined with only `title` and `completed` fields
- ✓ Function exists to create new Todo object
- ✓ New Todo defaults `completed` to `false`
- ✓ No prohibited fields are included (id, priority, category, tags, due_date, description, user info, timestamps)

**Testing Expectations**: Unit tests verify Todo creation with correct structure and default values.

**Status**: Not Started

**Estimated Complexity**: Simple

---

#### TASK-006

**Title**: Implement localStorage Save Function

**Description**: Implement function to save the Todos array to localStorage. Use localStorage key `"todo-items"`. Serialize the array to JSON using `JSON.stringify()`. Handle serialization errors gracefully.

**Dependencies**: TASK-005

**Files Affected**:
- `app.js` (modify)

**Requirements Covered**:
- FR-010: Data Persistence (save to localStorage)
- NFR-006: Single User Design (local storage only)

**Acceptance Criteria**:
- ✓ Function accepts Todos array as parameter
- ✓ Function serializes array to JSON
- ✓ Function stores JSON in localStorage with key `"todo-items"`
- ✓ Function handles serialization errors gracefully
- ✓ Function returns success/failure indication

**Testing Expectations**: Unit tests verify Todos are correctly serialized and saved to localStorage. Test with empty array, single Todo, and multiple Todos.

**Status**: Not Started

**Estimated Complexity**: Simple

---

#### TASK-007

**Title**: Implement localStorage Load Function

**Description**: Implement function to load the Todos array from localStorage. Retrieve data using localStorage key `"todo-items"`. Deserialize JSON using `JSON.parse()`. Handle empty storage (return empty array). Handle invalid JSON gracefully (return empty array).

**Dependencies**: TASK-006

**Files Affected**:
- `app.js` (modify)

**Requirements Covered**:
- FR-010: Data Persistence (load from localStorage)
- AC-010: Todos persist after refresh
- AC-011: Todos persist after browser reopen

**Acceptance Criteria**:
- ✓ Function retrieves data from localStorage with key `"todo-items"`
- ✓ Function deserializes JSON to array
- ✓ Function returns empty array `[]` when localStorage is empty (null)
- ✓ Function handles invalid JSON gracefully and returns empty array
- ✓ Function returns array of Todo objects

**Testing Expectations**: Unit tests verify Todos are correctly loaded from localStorage. Test empty storage, valid JSON, and invalid JSON scenarios.

**Status**: Not Started

**Estimated Complexity**: Simple

---

### Phase 4: Validation and Security

---

#### TASK-008

**Title**: Implement Title Validation Function

**Description**: Implement function to validate Todo titles. Reject empty strings. Reject whitespace-only strings (spaces, tabs, newlines). Return validation result (pass/fail) and error message if validation fails.

**Dependencies**: TASK-004

**Files Affected**:
- `app.js` (modify)

**Requirements Covered**:
- FR-009: Title Validation
- AC-002: User cannot add empty Todo

**Acceptance Criteria**:
- ✓ Function accepts title string as parameter
- ✓ Function rejects empty string `""`
- ✓ Function rejects whitespace-only strings (e.g., `"   "`, `"\t"`, `"\n"`)
- ✓ Function accepts valid titles (non-empty, contains non-whitespace)
- ✓ Function returns validation result (boolean or object with status and message)
- ✓ Function provides appropriate error message for invalid titles

**Testing Expectations**: Unit tests verify rejection of empty titles, rejection of whitespace-only titles, and acceptance of valid titles. Test multiple whitespace patterns.

**Status**: Not Started

**Estimated Complexity**: Simple

---

#### TASK-009

**Title**: Implement Title Normalization Function

**Description**: Implement function to normalize Todo titles by trimming leading and trailing whitespace. Use JavaScript `trim()` method. Return normalized title.

**Dependencies**: TASK-004

**Files Affected**:
- `app.js` (modify)

**Requirements Covered**:
- FR-009: Title Validation (normalization aspect)

**Acceptance Criteria**:
- ✓ Function accepts title string as parameter
- ✓ Function removes leading whitespace
- ✓ Function removes trailing whitespace
- ✓ Function preserves internal whitespace
- ✓ Function returns normalized title
- ✓ Example: `"  Buy milk  "` becomes `"Buy milk"`

**Testing Expectations**: Unit tests verify trimming of leading whitespace, trailing whitespace, and both. Test that internal whitespace is preserved.

**Status**: Not Started

**Estimated Complexity**: Simple

---

#### TASK-010

**Title**: Implement Safe Rendering Function

**Description**: Implement function to safely render Todo titles to the DOM to prevent XSS vulnerabilities. Use `textContent` property (not `innerHTML`) to set element text. Ensure user-entered content is treated as plain text, not HTML.

**Dependencies**: TASK-004

**Files Affected**:
- `app.js` (modify)

**Requirements Covered**:
- FR-011: Safe Content Rendering
- AC-013: User content rendered safely

**Acceptance Criteria**:
- ✓ Function accepts DOM element and title text as parameters
- ✓ Function sets element text using `textContent` property
- ✓ Function does NOT use `innerHTML`
- ✓ User-entered HTML/script content is displayed as text (not executed)
- ✓ Example: `"<script>alert('XSS')</script>"` displays as visible text

**Testing Expectations**: Unit tests verify that HTML/script content is rendered as text. Integration tests verify safe rendering in actual DOM display.

**Status**: Not Started

**Estimated Complexity**: Simple

---

### Phase 5: Todo Operations

---

#### TASK-011

**Title**: Implement Add Todo Function

**Description**: Implement function to add a new Todo. Get title from input field. Validate title (use validation function from TASK-008). If invalid, display error and stop. If valid, normalize title (use normalization function from TASK-009). Create new Todo object with normalized title and `completed: false`. Add to Todos array. Save to localStorage. Render updated list. Clear input field.

**Dependencies**: TASK-005, TASK-006, TASK-008, TASK-009

**Files Affected**:
- `app.js` (modify)

**Requirements Covered**:
- FR-001: Add Todo
- FR-009: Title Validation
- FR-010: Data Persistence
- AC-001: User can add valid Todo
- AC-002: User cannot add empty Todo

**Acceptance Criteria**:
- ✓ Function retrieves title from input field
- ✓ Function validates title using validation function
- ✓ If invalid: function displays error message and does not add Todo
- ✓ If valid: function normalizes title using normalization function
- ✓ Function creates new Todo object with normalized title and `completed: false`
- ✓ Function adds Todo to Todos array
- ✓ Function saves updated array to localStorage
- ✓ Function triggers render of updated Todo list
- ✓ Function clears input field after successful add
- ✓ Add button triggers this function

**Testing Expectations**: Unit tests verify Todo creation with valid title, rejection of invalid title, normalization, and default completed status. Integration tests verify complete add workflow including display and persistence.

**Status**: Not Started

**Estimated Complexity**: Moderate

---

#### TASK-012

**Title**: Implement Render Todo List Function

**Description**: Implement function to render the Todo list to the DOM. Clear existing list. Iterate through Todos array. For each Todo, create DOM elements (list item, title text, checkbox, Edit button, Delete button). Use safe rendering function (TASK-010) for title text. Attach event handlers to buttons and checkboxes. Display completed status visually.

**Dependencies**: TASK-007, TASK-010

**Files Affected**:
- `app.js` (modify)

**Requirements Covered**:
- FR-002: View Todo List
- FR-011: Safe Content Rendering
- AC-003: User can view all Todos

**Acceptance Criteria**:
- ✓ Function retrieves Todos array
- ✓ Function clears existing list in DOM
- ✓ For each Todo, function creates appropriate DOM elements
- ✓ Function uses safe rendering (textContent) for Todo titles
- ✓ Function displays completion checkbox with correct checked state
- ✓ Function displays Edit button for each Todo
- ✓ Function displays Delete button for each Todo
- ✓ Completed Todos are visually distinct (e.g., strikethrough, different color)
- ✓ Event handlers are attached to checkboxes and buttons
- ✓ Empty list displays appropriately (no errors)

**Testing Expectations**: Integration tests verify Todos are correctly rendered, completion status is displayed, and safe rendering prevents XSS.

**Status**: Not Started

**Estimated Complexity**: Moderate

---

#### TASK-013

**Title**: Implement Application Initialization

**Description**: Implement initialization function that runs when the page loads. Load Todos from localStorage. Render Todo list. Attach event handler to Add button. Set up application ready state.

**Dependencies**: TASK-007, TASK-011, TASK-012

**Files Affected**:
- `app.js` (modify)

**Requirements Covered**:
- FR-002: View Todo List
- FR-010: Data Persistence
- AC-010: Todos persist after refresh
- AC-011: Todos persist after browser reopen

**Acceptance Criteria**:
- ✓ Function runs when page loads (e.g., DOMContentLoaded event)
- ✓ Function loads Todos from localStorage
- ✓ Function renders Todo list to DOM
- ✓ Function attaches event handler to Add button
- ✓ Application is ready for user interaction
- ✓ Empty storage initializes with empty array (no errors)

**Testing Expectations**: Integration tests verify application loads correctly, existing Todos are displayed, and empty storage is handled.

**Status**: Not Started

**Estimated Complexity**: Simple

---

#### TASK-014

**Title**: Implement Edit Todo Function

**Description**: Implement function to enter edit mode for a Todo. Identify which Todo to edit (by index or unique identification). Preserve original Todo data for potential cancellation. Replace displayed title with editable input field containing current title. Hide Edit button. Show Update and Cancel buttons. Ensure only one Todo can be in edit mode at a time.

**Dependencies**: TASK-012

**Files Affected**:
- `app.js` (modify)

**Requirements Covered**:
- FR-003: Edit Existing Todo
- AC-004: User can edit Todo

**Acceptance Criteria**:
- ✓ Function identifies Todo to edit (by array index or other method)
- ✓ Function preserves original Todo data in memory
- ✓ Function replaces title display with editable input field
- ✓ Input field contains current title value
- ✓ Edit button is hidden
- ✓ Update button is shown
- ✓ Cancel button is shown
- ✓ Only one Todo can be in edit mode at a time (exit any existing edit mode)
- ✓ Edit button triggers this function

**Testing Expectations**: Integration tests verify edit mode is entered, original data is preserved, and UI updates appropriately.

**Status**: Not Started

**Estimated Complexity**: Moderate

---

#### TASK-015

**Title**: Implement Update Todo Function

**Description**: Implement function to save changes to edited Todo. Get new title from edit input field. Validate title (use validation function from TASK-008). If invalid, display error and remain in edit mode. If valid, normalize title (use normalization function from TASK-009). Update the EXISTING Todo object in the array with new title. Do NOT create duplicate Todo. Preserve completion status. Save to localStorage. Exit edit mode. Render updated list.

**Dependencies**: TASK-006, TASK-008, TASK-009, TASK-014

**Files Affected**:
- `app.js` (modify)

**Requirements Covered**:
- FR-004: Update Edited Todo
- FR-009: Title Validation
- FR-010: Data Persistence
- AC-005: User can save edited Todo
- AC-012: Edited Todo does not create duplicate

**Acceptance Criteria**:
- ✓ Function retrieves new title from edit input field
- ✓ Function validates new title using validation function
- ✓ If invalid: function displays error and remains in edit mode
- ✓ If valid: function normalizes title using normalization function
- ✓ Function updates EXISTING Todo object in array (modifies title property)
- ✓ Function does NOT add new Todo to array (no duplicate creation)
- ✓ Function preserves completion status (completed field unchanged)
- ✓ Function saves updated array to localStorage
- ✓ Function exits edit mode (restore normal display)
- ✓ Function triggers render of updated list
- ✓ Update button triggers this function

**Testing Expectations**: Unit tests verify update modifies existing Todo, does not create duplicate, and preserves completion status. Integration tests verify complete update workflow and persistence.

**Status**: Not Started

**Estimated Complexity**: Moderate

---

#### TASK-016

**Title**: Implement Cancel Edit Function

**Description**: Implement function to cancel editing and restore original Todo state. Discard any changes made in edit mode. Restore original Todo data from preserved copy. Exit edit mode. Render list (no changes persisted to localStorage).

**Dependencies**: TASK-014

**Files Affected**:
- `app.js` (modify)

**Requirements Covered**:
- FR-005: Cancel Editing
- AC-006: User can cancel editing

**Acceptance Criteria**:
- ✓ Function discards changes made in edit input field
- ✓ Function restores original Todo state from preserved data
- ✓ Original Todo remains unchanged in Todos array
- ✓ Function exits edit mode (restore normal display)
- ✓ Function renders list (shows original title)
- ✓ Function does NOT save to localStorage (no persistence of changes)
- ✓ Cancel button triggers this function

**Testing Expectations**: Integration tests verify cancel discards changes, original Todo is unchanged, and changes are not persisted to localStorage.

**Status**: Not Started

**Estimated Complexity**: Simple

---

#### TASK-017

**Title**: Implement Complete/Incomplete Toggle Function

**Description**: Implement function to toggle Todo completion status. Identify which Todo to toggle. If `completed` is `false`, set to `true`. If `completed` is `true`, set to `false`. Save to localStorage. Render updated list to reflect new completion status.

**Dependencies**: TASK-006, TASK-012

**Files Affected**:
- `app.js` (modify)

**Requirements Covered**:
- FR-006: Mark Todo Completed
- FR-007: Mark Todo Incomplete
- FR-010: Data Persistence
- AC-007: User can mark Todo complete
- AC-008: User can mark Todo incomplete

**Acceptance Criteria**:
- ✓ Function identifies Todo to toggle
- ✓ If Todo.completed is `false`, function sets it to `true`
- ✓ If Todo.completed is `true`, function sets it to `false`
- ✓ Function saves updated array to localStorage
- ✓ Function triggers render of updated list
- ✓ Visual display reflects new completion status
- ✓ Checkbox change event triggers this function

**Testing Expectations**: Unit tests verify completion status toggles correctly. Integration tests verify toggle workflow, visual display, and persistence.

**Status**: Not Started

**Estimated Complexity**: Simple

---

#### TASK-018

**Title**: Implement Delete Todo Function

**Description**: Implement function to delete a Todo. Identify which Todo to delete. Remove Todo from Todos array. Save updated array to localStorage. Render updated list (deleted Todo no longer visible). Ensure other Todos are unaffected.

**Dependencies**: TASK-006, TASK-012

**Files Affected**:
- `app.js` (modify)

**Requirements Covered**:
- FR-008: Delete Todo
- FR-010: Data Persistence
- AC-009: User can delete Todo

**Acceptance Criteria**:
- ✓ Function identifies Todo to delete
- ✓ Function removes Todo from Todos array
- ✓ Function does NOT affect other Todos in array
- ✓ Function saves updated array to localStorage
- ✓ Function triggers render of updated list
- ✓ Deleted Todo is no longer visible
- ✓ Deletion is persisted (survives page refresh)
- ✓ Delete button triggers this function

**Testing Expectations**: Unit tests verify Todo is removed from array and other Todos are unaffected. Integration tests verify complete delete workflow, display update, and persistence.

**Status**: Not Started

**Estimated Complexity**: Simple

---

### Phase 6: Unit Testing

---

#### TASK-019

**Title**: Create Unit Tests for Validation Logic

**Description**: Create unit tests for the title validation function. Test rejection of empty string. Test rejection of whitespace-only strings (spaces, tabs, newlines). Test acceptance of valid titles. Use Node.js built-in test runner (`node:test` and `node:assert`).

**Dependencies**: TASK-008

**Files Affected**:
- `tests/todo.unit.test.js` (modify)

**Requirements Covered**:
- FR-009: Title Validation
- Testing requirement for validation

**Acceptance Criteria**:
- ✓ Test exists for empty string rejection
- ✓ Test exists for whitespace-only rejection (multiple patterns tested)
- ✓ Test exists for valid title acceptance
- ✓ Tests use Node.js built-in test runner
- ✓ All tests pass

**Testing Expectations**: Run `node --test tests/todo.unit.test.js` and verify all validation tests pass.

**Status**: Not Started

**Estimated Complexity**: Simple

---

#### TASK-020

**Title**: Create Unit Tests for Normalization Logic

**Description**: Create unit tests for the title normalization function. Test trimming of leading whitespace. Test trimming of trailing whitespace. Test trimming of both leading and trailing whitespace. Test preservation of internal whitespace.

**Dependencies**: TASK-009

**Files Affected**:
- `tests/todo.unit.test.js` (modify)

**Requirements Covered**:
- FR-009: Title Validation (normalization aspect)
- Testing requirement for normalization

**Acceptance Criteria**:
- ✓ Test exists for leading whitespace trimming
- ✓ Test exists for trailing whitespace trimming
- ✓ Test exists for both leading and trailing trimming
- ✓ Test exists for internal whitespace preservation
- ✓ Tests use Node.js built-in test runner
- ✓ All tests pass

**Testing Expectations**: Run `node --test tests/todo.unit.test.js` and verify all normalization tests pass.

**Status**: Not Started

**Estimated Complexity**: Simple

---

#### TASK-021

**Title**: Create Unit Tests for Todo Creation

**Description**: Create unit tests for Todo creation. Test creating Todo with valid title. Test that new Todo has `completed: false` by default. Test that Todo object contains only `title` and `completed` fields.

**Dependencies**: TASK-005

**Files Affected**:
- `tests/todo.unit.test.js` (modify)

**Requirements Covered**:
- FR-001: Add Todo
- NFR-005: Data Model Constraints
- Testing requirement for Todo creation

**Acceptance Criteria**:
- ✓ Test exists for creating Todo with valid title
- ✓ Test verifies `completed` defaults to `false`
- ✓ Test verifies Todo contains only `title` and `completed` fields
- ✓ Tests use Node.js built-in test runner
- ✓ All tests pass

**Testing Expectations**: Run `node --test tests/todo.unit.test.js` and verify all Todo creation tests pass.

**Status**: Not Started

**Estimated Complexity**: Simple

---

#### TASK-022

**Title**: Create Unit Tests for Todo Update Behavior

**Description**: Create unit tests for updating a Todo. Test updating existing Todo title. Test that update does not create duplicate Todo. Test that completion status is preserved when title is updated.

**Dependencies**: TASK-015

**Files Affected**:
- `tests/todo.unit.test.js` (modify)

**Requirements Covered**:
- FR-004: Update Edited Todo
- AC-012: Edited Todo does not create duplicate
- Testing requirement for update behavior

**Acceptance Criteria**:
- ✓ Test exists for updating Todo title
- ✓ Test verifies array length does not increase (no duplicate)
- ✓ Test verifies existing Todo is modified
- ✓ Test verifies completion status is preserved
- ✓ Tests use Node.js built-in test runner
- ✓ All tests pass

**Testing Expectations**: Run `node --test tests/todo.unit.test.js` and verify all update tests pass.

**Status**: Not Started

**Estimated Complexity**: Simple

---

#### TASK-023

**Title**: Create Unit Tests for Completion State

**Description**: Create unit tests for toggling completion status. Test marking Todo as completed (false → true). Test marking Todo as incomplete (true → false). Test toggling multiple times.

**Dependencies**: TASK-017

**Files Affected**:
- `tests/todo.unit.test.js` (modify)

**Requirements Covered**:
- FR-006: Mark Todo Completed
- FR-007: Mark Todo Incomplete
- Testing requirement for completion state

**Acceptance Criteria**:
- ✓ Test exists for marking incomplete Todo as completed
- ✓ Test exists for marking completed Todo as incomplete
- ✓ Test exists for toggling multiple times
- ✓ Tests use Node.js built-in test runner
- ✓ All tests pass

**Testing Expectations**: Run `node --test tests/todo.unit.test.js` and verify all completion state tests pass.

**Status**: Not Started

**Estimated Complexity**: Simple

---

#### TASK-024

**Title**: Create Unit Tests for Deletion Behavior

**Description**: Create unit tests for deleting a Todo. Test removing Todo from array. Test that other Todos are unaffected. Test deletion when array has one item. Test deletion when array has multiple items.

**Dependencies**: TASK-018

**Files Affected**:
- `tests/todo.unit.test.js` (modify)

**Requirements Covered**:
- FR-008: Delete Todo
- Testing requirement for deletion behavior

**Acceptance Criteria**:
- ✓ Test exists for removing Todo from array
- ✓ Test verifies other Todos are unaffected
- ✓ Test exists for deleting single Todo
- ✓ Test exists for deleting from multiple Todos
- ✓ Tests use Node.js built-in test runner
- ✓ All tests pass

**Testing Expectations**: Run `node --test tests/todo.unit.test.js` and verify all deletion tests pass.

**Status**: Not Started

**Estimated Complexity**: Simple

---

#### TASK-025

**Title**: Create Unit Tests for Persistence Logic

**Description**: Create unit tests for localStorage save and load functions. Test serialization of Todos array to JSON. Test deserialization of JSON to Todos array. Test handling of empty storage (returns empty array). Test handling of invalid JSON (returns empty array gracefully).

**Dependencies**: TASK-006, TASK-007

**Files Affected**:
- `tests/todo.unit.test.js` (modify)

**Requirements Covered**:
- FR-010: Data Persistence
- Testing requirement for persistence logic

**Acceptance Criteria**:
- ✓ Test exists for saving Todos to localStorage
- ✓ Test exists for loading Todos from localStorage
- ✓ Test verifies correct serialization/deserialization
- ✓ Test exists for empty storage handling
- ✓ Test exists for invalid JSON handling
- ✓ Tests use Node.js built-in test runner
- ✓ All tests pass

**Testing Expectations**: Run `node --test tests/todo.unit.test.js` and verify all persistence tests pass.

**Status**: Not Started

**Estimated Complexity**: Simple

---

### Phase 7: Integration Testing

---

#### TASK-026

**Title**: Create Integration Tests for Add and Display

**Description**: Create integration-style tests for the complete Add and Display workflow. Test adding Todo and verifying it appears in the list. Test adding multiple Todos and verifying all appear. Test attempting to add invalid Todo and verifying validation error and no addition.

**Dependencies**: TASK-011, TASK-012, TASK-013

**Files Affected**:
- `tests/todo.integration.test.js` (modify)

**Requirements Covered**:
- FR-001: Add Todo
- FR-002: View Todo List
- FR-009: Title Validation
- AC-001: User can add valid Todo
- AC-002: User cannot add empty Todo
- AC-003: User can view all Todos
- Testing requirement for add/display workflow

**Acceptance Criteria**:
- ✓ Test exists for adding Todo and verifying it appears in rendered list
- ✓ Test exists for adding multiple Todos and verifying all appear
- ✓ Test exists for attempting to add empty Todo and verifying rejection
- ✓ Test exists for attempting to add whitespace-only Todo and verifying rejection
- ✓ Tests use Node.js built-in test runner
- ✓ All tests pass

**Testing Expectations**: Run `node --test tests/todo.integration.test.js` and verify all add/display tests pass.

**Status**: Not Started

**Estimated Complexity**: Moderate

---

#### TASK-027

**Title**: Create Integration Tests for Edit, Update, and Cancel

**Description**: Create integration-style tests for the complete Edit, Update, and Cancel workflows. Test editing Todo, updating with valid title, and verifying update persisted. Test editing Todo, updating, and verifying no duplicate created. Test editing Todo, attempting invalid title update, and verifying validation error. Test editing Todo, canceling, and verifying original unchanged. Test that canceled changes are not persisted.

**Dependencies**: TASK-014, TASK-015, TASK-016

**Files Affected**:
- `tests/todo.integration.test.js` (modify)

**Requirements Covered**:
- FR-003: Edit Existing Todo
- FR-004: Update Edited Todo
- FR-005: Cancel Editing
- FR-009: Title Validation
- AC-004: User can edit Todo
- AC-005: User can save edited Todo
- AC-006: User can cancel editing
- AC-012: Edited Todo does not create duplicate
- Testing requirement for edit/update/cancel workflow

**Acceptance Criteria**:
- ✓ Test exists for editing and updating Todo with valid title
- ✓ Test verifies updated Todo is persisted
- ✓ Test verifies no duplicate Todo is created
- ✓ Test exists for attempting to update with invalid title
- ✓ Test exists for canceling edit
- ✓ Test verifies original Todo is unchanged after cancel
- ✓ Test verifies canceled changes are not persisted
- ✓ Tests use Node.js built-in test runner
- ✓ All tests pass

**Testing Expectations**: Run `node --test tests/todo.integration.test.js` and verify all edit/update/cancel tests pass.

**Status**: Not Started

**Estimated Complexity**: Moderate

---

#### TASK-028

**Title**: Create Integration Tests for Complete/Incomplete

**Description**: Create integration-style tests for the complete/incomplete toggle workflow. Test marking incomplete Todo as completed and verifying status changed. Test marking completed Todo as incomplete and verifying status changed. Test that completion changes are persisted.

**Dependencies**: TASK-017

**Files Affected**:
- `tests/todo.integration.test.js` (modify)

**Requirements Covered**:
- FR-006: Mark Todo Completed
- FR-007: Mark Todo Incomplete
- FR-010: Data Persistence
- AC-007: User can mark Todo complete
- AC-008: User can mark Todo incomplete
- Testing requirement for complete/incomplete workflow

**Acceptance Criteria**:
- ✓ Test exists for marking incomplete Todo as completed
- ✓ Test verifies completion status changed to true
- ✓ Test exists for marking completed Todo as incomplete
- ✓ Test verifies completion status changed to false
- ✓ Test verifies completion changes are persisted to localStorage
- ✓ Tests use Node.js built-in test runner
- ✓ All tests pass

**Testing Expectations**: Run `node --test tests/todo.integration.test.js` and verify all complete/incomplete tests pass.

**Status**: Not Started

**Estimated Complexity**: Simple

---

#### TASK-029

**Title**: Create Integration Tests for Delete

**Description**: Create integration-style tests for the delete workflow. Test deleting Todo and verifying it no longer appears. Test deleting Todo and verifying other Todos are unaffected. Test that deletion is persisted.

**Dependencies**: TASK-018

**Files Affected**:
- `tests/todo.integration.test.js` (modify)

**Requirements Covered**:
- FR-008: Delete Todo
- FR-010: Data Persistence
- AC-009: User can delete Todo
- Testing requirement for delete workflow

**Acceptance Criteria**:
- ✓ Test exists for deleting Todo
- ✓ Test verifies deleted Todo no longer appears in list
- ✓ Test verifies other Todos remain and are unaffected
- ✓ Test verifies deletion is persisted to localStorage
- ✓ Tests use Node.js built-in test runner
- ✓ All tests pass

**Testing Expectations**: Run `node --test tests/todo.integration.test.js` and verify all delete tests pass.

**Status**: Not Started

**Estimated Complexity**: Simple

---

#### TASK-030

**Title**: Create Integration Tests for Persistence Behavior

**Description**: Create integration-style tests for persistence across simulated page reloads. Test adding Todo, simulating reload, and verifying Todo still exists. Test updating Todo, simulating reload, and verifying update persisted. Test completing Todo, simulating reload, and verifying completion status persisted. Test deleting Todo, simulating reload, and verifying deletion persisted.

**Dependencies**: TASK-011, TASK-015, TASK-017, TASK-018

**Files Affected**:
- `tests/todo.integration.test.js` (modify)

**Requirements Covered**:
- FR-010: Data Persistence
- AC-010: Todos persist after refresh
- AC-011: Todos persist after browser reopen
- Testing requirement for persistence behavior

**Acceptance Criteria**:
- ✓ Test exists for add → reload → verify
- ✓ Test exists for update → reload → verify
- ✓ Test exists for complete → reload → verify
- ✓ Test exists for delete → reload → verify
- ✓ Tests simulate page reload by clearing state and reloading from localStorage
- ✓ Tests use Node.js built-in test runner
- ✓ All tests pass

**Testing Expectations**: Run `node --test tests/todo.integration.test.js` and verify all persistence tests pass.

**Status**: Not Started

**Estimated Complexity**: Moderate

---

### Phase 8: Verification and Documentation

---

#### TASK-031

**Title**: Run Complete Test Suite and Verify All Requirements

**Description**: Run the complete test suite (unit tests and integration-style tests). Verify all tests pass. Manually verify all functional requirements (FR-001 through FR-011) are implemented. Manually verify all acceptance criteria (AC-001 through AC-013) are satisfied. Test in actual browser to confirm localStorage persistence, edit/update/cancel behavior, and safe rendering.

**Dependencies**: TASK-019, TASK-020, TASK-021, TASK-022, TASK-023, TASK-024, TASK-025, TASK-026, TASK-027, TASK-028, TASK-029, TASK-030

**Files Affected**: None (verification only)

**Requirements Covered**:
- All FR-001 through FR-011
- All NFR-001 through NFR-006
- All AC-001 through AC-013

**Acceptance Criteria**:
- ✓ All unit tests pass (`node --test tests/todo.unit.test.js`)
- ✓ All integration tests pass (`node --test tests/todo.integration.test.js`)
- ✓ Manual verification: Add Todo works with validation
- ✓ Manual verification: View Todo list displays all Todos
- ✓ Manual verification: Edit Todo enters edit mode
- ✓ Manual verification: Update Todo modifies existing (no duplicate)
- ✓ Manual verification: Cancel Edit restores original
- ✓ Manual verification: Complete/Incomplete toggles status
- ✓ Manual verification: Delete removes Todo
- ✓ Manual verification: localStorage persists Todos across browser refresh
- ✓ Manual verification: localStorage persists Todos across browser close/reopen
- ✓ Manual verification: User-entered HTML/script displays as text (XSS prevention)
- ✓ Manual verification: UI is simple, clean, and usable
- ✓ Manual verification: Data model contains only title and completed
- ✓ Manual verification: No prohibited functionality was added

**Testing Expectations**: Complete test suite passes. All requirements satisfied. Application works correctly in browser.

**Status**: Not Started

**Estimated Complexity**: Simple

---

#### TASK-032

**Title**: Create Implementation Documentation

**Description**: Create `implementation.md` documenting the implementation process, key decisions, architecture adherence, testing results, and any challenges encountered. Document how the implementation satisfies each requirement. Include test execution results.

**Dependencies**: TASK-031

**Files Affected**:
- `implementation.md` (create)

**Requirements Covered**:
- Documentation requirement

**Acceptance Criteria**:
- ✓ `implementation.md` exists
- ✓ Document describes implementation approach
- ✓ Document explains how implementation satisfies requirements
- ✓ Document includes test execution results
- ✓ Document notes adherence to architecture
- ✓ Document describes any implementation challenges and resolutions
- ✓ Document confirms no scope creep
- ✓ Document confirms Definition of Done is met

**Testing Expectations**: Document is complete and accurate.

**Status**: Not Started

**Estimated Complexity**: Simple

---

## 4. Testing Strategy

### Testing Approach

The testing strategy uses a two-level approach as defined in the approved architecture:

**Level 1: Unit Tests** - Test individual application logic functions in isolation. Focus on validation, normalization, Todo operations, and persistence logic.

**Level 2: Integration-Style Tests** - Test complete user workflows involving multiple components. Focus on end-to-end scenarios including add/display, edit/update/cancel, complete/incomplete, delete, and persistence across simulated reloads.

### Test Technology

**Node.js Built-in Test Runner**: All tests use Node.js built-in test runner (Node.js 18+) with `node:test` module and `node:assert` for assertions. This eliminates external test framework dependencies and aligns with the simplicity goals.

**Test Execution**: 
- Unit tests: `node --test tests/todo.unit.test.js`
- Integration tests: `node --test tests/todo.integration.test.js`
- All tests: `node --test tests/`

### Unit Test Coverage

Unit tests (TASK-019 through TASK-025) cover:

1. **Validation Logic**: Empty rejection, whitespace-only rejection, valid acceptance
2. **Normalization Logic**: Leading trim, trailing trim, both trim, internal whitespace preservation
3. **Todo Creation**: Valid title, default completed=false, correct structure (title and completed only)
4. **Todo Update Behavior**: Update existing, no duplicate, preserve completion status
5. **Completion State**: Mark completed, mark incomplete, toggle multiple times
6. **Deletion Behavior**: Remove from array, don't affect others, single/multiple item scenarios
7. **Persistence Logic**: Serialize, deserialize, empty storage, invalid JSON

**Test File**: `tests/todo.unit.test.js`

### Integration-Style Test Coverage

Integration-style tests (TASK-026 through TASK-030) cover:

1. **Add and Display**: Add valid Todo → verify appears; add multiple → verify all appear; add invalid → verify rejected
2. **Edit, Update, Cancel**: Edit → update valid → verify persisted; update → verify no duplicate; update invalid → verify rejected; cancel → verify original unchanged
3. **Complete/Incomplete**: Mark completed → verify; mark incomplete → verify; verify persisted
4. **Delete**: Delete → verify gone; verify others unaffected; verify persisted
5. **Persistence Behavior**: Add → reload → verify; update → reload → verify; complete → reload → verify; delete → reload → verify

**Test File**: `tests/todo.integration.test.js`

### DOM Testing Approach

Integration tests may need to simulate DOM environment. Following the Design Review informational finding (DF-001), the implementation should consider:
- Structuring application logic as testable pure functions where possible
- Using JSDOM for lightweight DOM simulation if needed (acceptable dependency)
- Testing logic separately from rendering where practical

The specific approach will be determined during implementation based on actual code structure.

### Testing Philosophy

- Tests are created alongside or immediately after the logic they verify
- Tests cover both happy paths and error cases
- Tests verify requirements and acceptance criteria
- All tests must pass before implementation is considered complete

## 5. Requirements Traceability

This table maps each functional requirement and acceptance criteria to the implementation task(s) that satisfy it.

| Requirement ID | Requirement | Implementation Tasks |
|----------------|-------------|---------------------|
| FR-001 | Add Todo | TASK-005, TASK-011, TASK-021, TASK-026 |
| FR-002 | View Todo List | TASK-012, TASK-013, TASK-026 |
| FR-003 | Edit Existing Todo | TASK-014, TASK-027 |
| FR-004 | Update Edited Todo | TASK-015, TASK-022, TASK-027 |
| FR-005 | Cancel Editing | TASK-016, TASK-027 |
| FR-006 | Mark Todo Completed | TASK-017, TASK-023, TASK-028 |
| FR-007 | Mark Todo Incomplete | TASK-017, TASK-023, TASK-028 |
| FR-008 | Delete Todo | TASK-018, TASK-024, TASK-029 |
| FR-009 | Title Validation | TASK-008, TASK-009, TASK-011, TASK-015, TASK-019, TASK-020, TASK-026, TASK-027 |
| FR-010 | Data Persistence | TASK-006, TASK-007, TASK-011, TASK-013, TASK-015, TASK-017, TASK-018, TASK-025, TASK-030 |
| FR-011 | Safe Content Rendering | TASK-010, TASK-012 |

| Requirement ID | Requirement | Implementation Tasks |
|----------------|-------------|---------------------|
| NFR-001 | Simplicity | TASK-001, TASK-002, TASK-003, TASK-004 |
| NFR-002 | Usability | TASK-002, TASK-003 |
| NFR-003 | Technology Constraints | All tasks (only approved technologies used) |
| NFR-004 | Maintainability | TASK-001, TASK-002, TASK-004 |
| NFR-005 | Data Model Constraints | TASK-005, TASK-021 |
| NFR-006 | Single User Design | TASK-006, TASK-007 |

| Acceptance Criteria ID | Acceptance Criteria | Implementation Tasks |
|------------------------|---------------------|---------------------|
| AC-001 | User can add valid Todo | TASK-011, TASK-026 |
| AC-002 | User cannot add empty Todo | TASK-008, TASK-011, TASK-019, TASK-026 |
| AC-003 | User can view all Todos | TASK-012, TASK-013, TASK-026 |
| AC-004 | User can edit Todo | TASK-014, TASK-027 |
| AC-005 | User can save edited Todo | TASK-015, TASK-027 |
| AC-006 | User can cancel editing | TASK-016, TASK-027 |
| AC-007 | User can mark Todo complete | TASK-017, TASK-028 |
| AC-008 | User can mark Todo incomplete | TASK-017, TASK-028 |
| AC-009 | User can delete Todo | TASK-018, TASK-029 |
| AC-010 | Todos persist after refresh | TASK-007, TASK-013, TASK-030 |
| AC-011 | Todos persist after browser reopen | TASK-007, TASK-030 |
| AC-012 | Edited Todo does not create duplicate | TASK-015, TASK-022, TASK-027 |
| AC-013 | User content rendered safely | TASK-010, TASK-012 |

**Requirements Coverage**: 100% - Every functional requirement, non-functional requirement, and acceptance criteria is covered by one or more implementation tasks.

## 6. Definition of Done

The implementation is considered complete when ALL of the following conditions are met:

### Requirements Implementation
- ✓ All functional requirements (FR-001 through FR-011) are implemented
- ✓ All non-functional requirements (NFR-001 through NFR-006) are satisfied
- ✓ All acceptance criteria (AC-001 through AC-013) pass

### Testing
- ✓ All unit tests pass
- ✓ All integration-style tests pass
- ✓ Test coverage includes validation, normalization, CRUD operations, and persistence
- ✓ Test execution: `node --test tests/` completes successfully

### Core Functionality
- ✓ User can add Todo with valid title
- ✓ User cannot add empty or whitespace-only Todo (validation works)
- ✓ User can view all Todos in the list
- ✓ User can edit existing Todo (enters edit mode)
- ✓ User can update edited Todo (modifies existing, does NOT create duplicate)
- ✓ User can cancel editing (restores original, no persistence)
- ✓ User can mark Todo as completed
- ✓ User can mark completed Todo as incomplete
- ✓ User can delete Todo

### Persistence
- ✓ localStorage persistence works correctly
- ✓ Todos persist across browser refresh
- ✓ Todos persist across browser close and reopen
- ✓ localStorage key is `"todo-items"`
- ✓ Empty storage is handled gracefully

### Data Model
- ✓ Todo contains only `title` (string) and `completed` (boolean)
- ✓ No prohibited fields are present (id, priority, category, tags, due_date, description, timestamps, user info)

### Security
- ✓ User-entered content is safely rendered (textContent used, not innerHTML)
- ✓ XSS prevention is working (HTML/script content displays as text)

### Technology Constraints
- ✓ Only approved technologies used (HTML, CSS, vanilla JavaScript, localStorage)
- ✓ No frameworks (React, Angular, Vue)
- ✓ No backend, database, or external APIs
- ✓ Tests use Node.js built-in test runner only

### Scope Protection
- ✓ No functionality outside approved scope has been added
- ✓ No authentication, user accounts, or multi-user features
- ✓ No advanced features (search, filtering, sorting, priorities, categories, tags, due dates, descriptions)
- ✓ No advanced UI features (notifications, dashboards, analytics)

### Code Quality
- ✓ Code is maintainable with clear naming and organization
- ✓ Three-layer architecture (Presentation, Application Logic, Persistence) is followed
- ✓ Code uses clear, descriptive variable and function names
- ✓ Code is simple and understandable

### Documentation
- ✓ `implementation.md` is created
- ✓ Implementation documentation describes approach and decisions
- ✓ Test results are documented

### SDLC Artifacts
- ✓ Code review has been completed
- ✓ `code-review.md` is created with findings
- ✓ Verification has been completed
- ✓ `verification-report.md` is created with test evidence
- ✓ Pull request is prepared
- ✓ `pr.md` is created

### Final Verification
- ✓ Application works correctly in browser (manual testing completed)
- ✓ All requirements traceability verified
- ✓ No known bugs or issues remain

## 7. Risks and Dependencies

### External Dependencies

**Risk**: Node.js version compatibility for built-in test runner

**Mitigation**: Node.js 18+ is required for `node:test` module. Verify Node.js version before running tests. Document Node.js version requirement in project.

**Risk**: Browser localStorage support

**Mitigation**: All modern browsers support localStorage. Document browser compatibility requirements. Test in target browsers.

### Technical Challenges

**Risk**: DOM testing approach may require additional consideration

**Mitigation**: Following Design Review finding DF-001, structure application logic as testable pure functions where practical. If DOM simulation is needed, JSDOM is an acceptable lightweight dependency.

**Risk**: Identifying Todos for edit/update/delete without unique IDs

**Mitigation**: Use array index as identification mechanism. Ensure edit mode tracks current Todo index. Consider using array index or creating temporary identification during runtime (not persisted).

**Risk**: Handling edge cases in localStorage (quota exceeded, disabled storage)

**Mitigation**: Implement error handling for localStorage operations. Test quota scenarios if possible. Document localStorage dependency.

### Scope Creep Risks

**Risk**: Temptation to add "nice to have" features during implementation

**Mitigation**: Strict adherence to requirements traceability. Every implementation decision must trace to an approved requirement. Review Definition of Done regularly. No features beyond approved scope.

**Risk**: Adding fields to Todo data model for "future flexibility"

**Mitigation**: Enforce data model constraints in code and tests. Only `title` and `completed` fields allowed. Unit tests verify correct structure.

### Dependency Risks

**Risk**: Blocked tasks waiting for prerequisites

**Mitigation**: Follow dependency-ordered task sequence. Complete foundational tasks (setup, data model, persistence) before operations. Parallelize where possible (e.g., different unit tests).

**Risk**: Test implementation blocked by application logic

**Mitigation**: Implement tests alongside logic. Unit tests can be written immediately after corresponding logic. Integration tests require multiple components complete.

## 8. Blocked Tasks

This section identifies which tasks are blocked by other tasks and cannot proceed until prerequisites are complete.

### Critical Path Tasks

**TASK-001** (Project Setup): No blockers - can start immediately

**TASK-002** (HTML Structure): Blocked by TASK-001

**TASK-003** (CSS): Blocked by TASK-002

**TASK-004** (JavaScript Structure): Blocked by TASK-002

### Foundation Tasks

**TASK-005** (Data Model): Blocked by TASK-004

**TASK-006** (localStorage Save): Blocked by TASK-005

**TASK-007** (localStorage Load): Blocked by TASK-006

**TASK-008** (Validation): Blocked by TASK-004

**TASK-009** (Normalization): Blocked by TASK-004

**TASK-010** (Safe Rendering): Blocked by TASK-004

### Operation Tasks

**TASK-011** (Add Todo): Blocked by TASK-005, TASK-006, TASK-008, TASK-009

**TASK-012** (Render List): Blocked by TASK-007, TASK-010

**TASK-013** (Initialization): Blocked by TASK-007, TASK-011, TASK-012

**TASK-014** (Edit): Blocked by TASK-012

**TASK-015** (Update): Blocked by TASK-006, TASK-008, TASK-009, TASK-014

**TASK-016** (Cancel): Blocked by TASK-014

**TASK-017** (Complete/Incomplete): Blocked by TASK-006, TASK-012

**TASK-018** (Delete): Blocked by TASK-006, TASK-012

### Unit Test Tasks

**TASK-019** (Validation Tests): Blocked by TASK-008

**TASK-020** (Normalization Tests): Blocked by TASK-009

**TASK-021** (Creation Tests): Blocked by TASK-005

**TASK-022** (Update Tests): Blocked by TASK-015

**TASK-023** (Completion Tests): Blocked by TASK-017

**TASK-024** (Deletion Tests): Blocked by TASK-018

**TASK-025** (Persistence Tests): Blocked by TASK-006, TASK-007

### Integration Test Tasks

**TASK-026** (Add/Display Tests): Blocked by TASK-011, TASK-012, TASK-013

**TASK-027** (Edit/Update/Cancel Tests): Blocked by TASK-014, TASK-015, TASK-016

**TASK-028** (Complete/Incomplete Tests): Blocked by TASK-017

**TASK-029** (Delete Tests): Blocked by TASK-018

**TASK-030** (Persistence Tests): Blocked by TASK-011, TASK-015, TASK-017, TASK-018

### Verification Tasks

**TASK-031** (Verification): Blocked by all test tasks (TASK-019 through TASK-030)

**TASK-032** (Documentation): Blocked by TASK-031

### Parallelization Opportunities

After foundational tasks complete, the following can be parallelized:

**Group 1** (after TASK-010): TASK-011, TASK-012, TASK-017, TASK-018 (operations that don't depend on each other)

**Group 2** (after TASK-011, TASK-012, TASK-013): TASK-014 (Edit)

**Group 3** (unit tests): TASK-019, TASK-020, TASK-021 can proceed in parallel once their dependencies are met

**Group 4** (integration tests): TASK-026, TASK-028, TASK-029 can proceed in parallel once their dependencies are met

## 9. Implementation Sequence

This high-level sequence shows the order in which phases should be completed:

### Sequence Overview

```
Phase 1: Project Setup
   ↓
Phase 2: Core Application Structure
   ↓
Phase 3: Data and Persistence Foundation
   ↓
Phase 4: Validation and Security
   ↓
Phase 5: Todo Operations
   ↓
Phase 6: Unit Testing
   ↓
Phase 7: Integration Testing
   ↓
Phase 8: Verification and Documentation
```

### Detailed Sequence

**Step 1**: Project Setup (TASK-001)
- Create directory structure and files
- Establishes project foundation

**Step 2**: HTML and CSS (TASK-002, TASK-003)
- Implement HTML structure
- Implement CSS styling
- Establishes UI foundation

**Step 3**: JavaScript Structure (TASK-004)
- Create application architecture
- Set up three-layer structure
- Prepare function stubs

**Step 4**: Data Model and Persistence (TASK-005, TASK-006, TASK-007)
- Define Todo data model
- Implement localStorage save
- Implement localStorage load
- Establishes data foundation

**Step 5**: Validation and Security (TASK-008, TASK-009, TASK-010)
- Implement validation function
- Implement normalization function
- Implement safe rendering function
- Establishes input safety

**Step 6**: Core Operations (TASK-011, TASK-012, TASK-013)
- Implement Add Todo
- Implement Render List
- Implement Initialization
- Establishes basic functionality

**Step 7**: Advanced Operations (TASK-014, TASK-015, TASK-016, TASK-017, TASK-018)
- Implement Edit
- Implement Update
- Implement Cancel
- Implement Complete/Incomplete
- Implement Delete
- Completes all CRUD operations

**Step 8**: Unit Testing (TASK-019 through TASK-025)
- Create unit tests for all logic
- Verify individual functions work correctly
- Establishes confidence in logic

**Step 9**: Integration Testing (TASK-026 through TASK-030)
- Create integration-style tests for workflows
- Verify complete user scenarios work correctly
- Establishes confidence in workflows

**Step 10**: Final Verification (TASK-031, TASK-032)
- Run complete test suite
- Verify all requirements satisfied
- Create implementation documentation
- Prepare for code review

### Critical Path

The critical path (longest dependency chain) is:
TASK-001 → TASK-002 → TASK-004 → TASK-005 → TASK-006 → TASK-007 → TASK-011 → TASK-012 → TASK-013 → TASK-014 → TASK-015 → TASK-027 → TASK-031 → TASK-032

**Estimated Critical Path**: 18 tasks in sequence

### Next Steps After Planning

Once this implementation plan is approved:
1. Begin with TASK-001 (Project Setup)
2. Proceed through tasks in dependency order
3. Create tests alongside implementation
4. Verify requirements continuously
5. Complete all tasks to meet Definition of Done
6. Proceed to Code Review phase

---

## Implementation Planning Quality Gate

**Verification Checklist** (all items verified ✓):

✓ All functional requirements (FR-001 through FR-011) covered by tasks  
✓ All non-functional requirements (NFR-001 through NFR-006) covered by tasks  
✓ All acceptance criteria (AC-001 through AC-013) covered by tasks  
✓ Tasks ordered by dependencies (prerequisites first)  
✓ Each task has clear, testable acceptance criteria  
✓ Testing tasks included for all functionality (unit and integration)  
✓ Data model tasks enforce title and completed only  
✓ Edit/update tasks prevent duplicate creation (TASK-015)  
✓ Cancel task preserves original data (TASK-016)  
✓ Safe rendering task prevents XSS (TASK-010)  
✓ localStorage persistence tasks cover save, load, empty storage  
✓ Validation tasks cover empty and whitespace rejection  
✓ No tasks introduce prohibited functionality  
✓ Technology constraints respected (vanilla HTML/CSS/JS, localStorage, Node.js test runner)  
✓ Definition of Done is comprehensive and verifiable  
✓ Requirements traceability established (100% coverage)  
✓ Blocked tasks identified  
✓ Implementation sequence defined  
✓ No application code created  
✓ No tests created  
✓ No SDLC phases beyond Implementation Planning performed  

**Implementation Planning Phase Complete**
