// Todo List Application
// Three-layer architecture: Persistence, Application Logic, Presentation

(function() {
    'use strict';

    // ===========================
    // Constants
    // ===========================
    const STORAGE_KEY = 'todo-items';

    // ===========================
    // State
    // ===========================
    let todos = [];
    let editingIndex = null;
    let originalTodo = null;

    // ===========================
    // Persistence Layer
    // ===========================

    /**
     * Save todos array to localStorage
     * @param {Array} todosArray - Array of todo objects
     * @returns {boolean} - Success status
     */
    function saveTodos(todosArray) {
        try {
            const json = JSON.stringify(todosArray);
            localStorage.setItem(STORAGE_KEY, json);
            return true;
        } catch (error) {
            console.error('Failed to save todos:', error);
            return false;
        }
    }

    /**
     * Load todos array from localStorage
     * @returns {Array} - Array of todo objects (empty array if none exist)
     */
    function loadTodos() {
        try {
            const json = localStorage.getItem(STORAGE_KEY);
            if (json === null) {
                return [];
            }
            const parsed = JSON.parse(json);
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.error('Failed to load todos:', error);
            return [];
        }
    }

    // ===========================
    // Validation & Normalization
    // ===========================

    /**
     * Validate todo title
     * @param {string} title - Title to validate
     * @returns {{valid: boolean, message: string}} - Validation result
     */
    function validateTitle(title) {
        if (typeof title !== 'string') {
            return { valid: false, message: 'Title must be a string' };
        }

        if (title.length === 0) {
            return { valid: false, message: 'Title cannot be empty' };
        }

        if (title.trim().length === 0) {
            return { valid: false, message: 'Title cannot be only whitespace' };
        }

        return { valid: true, message: '' };
    }

    /**
     * Normalize title by trimming whitespace
     * @param {string} title - Title to normalize
     * @returns {string} - Normalized title
     */
    function normalizeTitle(title) {
        return title.trim();
    }

    // ===========================
    // Application Logic Layer
    // ===========================

    /**
     * Create a new todo object
     * @param {string} title - Todo title
     * @returns {{title: string, completed: boolean}} - Todo object
     */
    function createTodo(title) {
        return {
            title: title,
            completed: false
        };
    }

    /**
     * Add a new todo
     * @param {string} title - Todo title
     * @returns {{success: boolean, message: string}} - Operation result
     */
    function addTodo(title) {
        const validation = validateTitle(title);
        if (!validation.valid) {
            return { success: false, message: validation.message };
        }

        const normalizedTitle = normalizeTitle(title);
        const todo = createTodo(normalizedTitle);
        todos.push(todo);
        saveTodos(todos);

        return { success: true, message: 'Todo added' };
    }

    /**
     * Start editing a todo
     * @param {number} index - Index of todo to edit
     */
    function startEditTodo(index) {
        if (editingIndex !== null) {
            cancelEditTodo();
        }

        editingIndex = index;
        originalTodo = { ...todos[index] };
    }

    /**
     * Update an edited todo
     * @param {number} index - Index of todo to update
     * @param {string} newTitle - New title
     * @returns {{success: boolean, message: string}} - Operation result
     */
    function updateTodo(index, newTitle) {
        const validation = validateTitle(newTitle);
        if (!validation.valid) {
            return { success: false, message: validation.message };
        }

        const normalizedTitle = normalizeTitle(newTitle);
        todos[index].title = normalizedTitle;
        saveTodos(todos);

        editingIndex = null;
        originalTodo = null;

        return { success: true, message: 'Todo updated' };
    }

    /**
     * Cancel editing a todo
     */
    function cancelEditTodo() {
        if (editingIndex !== null && originalTodo !== null) {
            todos[editingIndex] = originalTodo;
        }

        editingIndex = null;
        originalTodo = null;
    }

    /**
     * Toggle todo completion status
     * @param {number} index - Index of todo to toggle
     */
    function toggleTodoComplete(index) {
        todos[index].completed = !todos[index].completed;
        saveTodos(todos);
    }

    /**
     * Delete a todo
     * @param {number} index - Index of todo to delete
     */
    function deleteTodo(index) {
        todos.splice(index, 1);
        saveTodos(todos);
    }

    // ===========================
    // Presentation Layer
    // ===========================

    /**
     * Safe rendering: Set text content safely to prevent XSS
     * @param {HTMLElement} element - Element to set text on
     * @param {string} text - Text to set
     */
    function safeSetText(element, text) {
        element.textContent = text;
    }

    /**
     * Show validation message
     * @param {string} message - Message to display
     */
    function showValidationMessage(message) {
        const messageElement = document.getElementById('validationMessage');
        safeSetText(messageElement, message);
    }

    /**
     * Clear validation message
     */
    function clearValidationMessage() {
        const messageElement = document.getElementById('validationMessage');
        safeSetText(messageElement, '');
    }

    /**
     * Render the todo list
     */
    function renderTodoList() {
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = '';

        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            if (todo.completed) {
                li.classList.add('completed');
            }

            // Checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'todo-checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => handleToggleComplete(index));

            if (editingIndex === index) {
                // Edit mode
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'todo-edit-input';
                input.value = todo.title;

                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'todo-actions';

                const updateButton = document.createElement('button');
                updateButton.className = 'update-button';
                safeSetText(updateButton, 'Update');
                updateButton.addEventListener('click', () => handleUpdateTodo(index, input.value));

                const cancelButton = document.createElement('button');
                cancelButton.className = 'cancel-button';
                safeSetText(cancelButton, 'Cancel');
                cancelButton.addEventListener('click', () => handleCancelEdit());

                actionsDiv.appendChild(updateButton);
                actionsDiv.appendChild(cancelButton);

                li.appendChild(checkbox);
                li.appendChild(input);
                li.appendChild(actionsDiv);
            } else {
                // Display mode
                const titleSpan = document.createElement('span');
                titleSpan.className = 'todo-title';
                safeSetText(titleSpan, todo.title);

                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'todo-actions';

                const editButton = document.createElement('button');
                editButton.className = 'edit-button';
                safeSetText(editButton, 'Edit');
                editButton.addEventListener('click', () => handleEditTodo(index));

                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-button';
                safeSetText(deleteButton, 'Delete');
                deleteButton.addEventListener('click', () => handleDeleteTodo(index));

                actionsDiv.appendChild(editButton);
                actionsDiv.appendChild(deleteButton);

                li.appendChild(checkbox);
                li.appendChild(titleSpan);
                li.appendChild(actionsDiv);
            }

            todoList.appendChild(li);
        });
    }

    // ===========================
    // Event Handlers
    // ===========================

    /**
     * Handle add todo
     */
    function handleAddTodo() {
        const input = document.getElementById('todoInput');
        const title = input.value;

        const result = addTodo(title);

        if (result.success) {
            input.value = '';
            clearValidationMessage();
            renderTodoList();
        } else {
            showValidationMessage(result.message);
        }
    }

    /**
     * Handle edit todo
     * @param {number} index - Index of todo to edit
     */
    function handleEditTodo(index) {
        startEditTodo(index);
        clearValidationMessage();
        renderTodoList();
    }

    /**
     * Handle update todo
     * @param {number} index - Index of todo to update
     * @param {string} newTitle - New title
     */
    function handleUpdateTodo(index, newTitle) {
        const result = updateTodo(index, newTitle);

        if (result.success) {
            clearValidationMessage();
            renderTodoList();
        } else {
            showValidationMessage(result.message);
        }
    }

    /**
     * Handle cancel edit
     */
    function handleCancelEdit() {
        cancelEditTodo();
        clearValidationMessage();
        renderTodoList();
    }

    /**
     * Handle toggle complete
     * @param {number} index - Index of todo to toggle
     */
    function handleToggleComplete(index) {
        toggleTodoComplete(index);
        renderTodoList();
    }

    /**
     * Handle delete todo
     * @param {number} index - Index of todo to delete
     */
    function handleDeleteTodo(index) {
        if (editingIndex === index) {
            editingIndex = null;
            originalTodo = null;
        }
        deleteTodo(index);
        renderTodoList();
    }

    // ===========================
    // Initialization
    // ===========================

    /**
     * Initialize the application
     */
    function init() {
        // Load todos from localStorage
        todos = loadTodos();

        // Render initial todo list
        renderTodoList();

        // Set up event listeners
        const addButton = document.getElementById('addButton');
        addButton.addEventListener('click', handleAddTodo);

        const todoInput = document.getElementById('todoInput');
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleAddTodo();
            }
        });
    }

    // Run initialization when DOM is ready (only in browser)
    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    }

    // ===========================
    // Exports for Testing
    // ===========================
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            validateTitle,
            normalizeTitle,
            createTodo,
            saveTodos,
            loadTodos
        };
    }
})();
