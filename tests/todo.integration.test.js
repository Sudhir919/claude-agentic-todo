// Integration Tests for Todo Application
// Uses Node.js built-in test runner

const { test, describe } = require('node:test');
const assert = require('node:assert');

// Mock localStorage for Node.js environment
global.localStorage = {
    data: {},
    getItem(key) {
        return this.data[key] || null;
    },
    setItem(key, value) {
        this.data[key] = value;
    },
    clear() {
        this.data = {};
    }
};

// Load app.js functions
const {
    validateTitle,
    normalizeTitle,
    createTodo,
    saveTodos,
    loadTodos
} = require('../app.js');

// Integration test helpers
function simulateAddTodo(title) {
    const validation = validateTitle(title);
    if (!validation.valid) {
        return { success: false, message: validation.message, todos: null };
    }

    const normalizedTitle = normalizeTitle(title);
    const todo = createTodo(normalizedTitle);

    const todos = loadTodos();
    todos.push(todo);
    saveTodos(todos);

    return { success: true, message: 'Added', todos: todos };
}

function simulateUpdateTodo(index, newTitle) {
    const validation = validateTitle(newTitle);
    if (!validation.valid) {
        return { success: false, message: validation.message };
    }

    const todos = loadTodos();
    const normalizedTitle = normalizeTitle(newTitle);
    todos[index].title = normalizedTitle;
    saveTodos(todos);

    return { success: true, message: 'Updated', todos: todos };
}

function simulateCompleteTodo(index, completed) {
    const todos = loadTodos();
    todos[index].completed = completed;
    saveTodos(todos);

    return { success: true, todos: todos };
}

function simulateDeleteTodo(index) {
    const todos = loadTodos();
    todos.splice(index, 1);
    saveTodos(todos);

    return { success: true, todos: todos };
}

describe('Add and Display Integration', () => {
    test('should add todo and verify it appears', () => {
        localStorage.clear();

        const result = simulateAddTodo('Buy milk');

        assert.strictEqual(result.success, true);
        assert.strictEqual(result.todos.length, 1);
        assert.strictEqual(result.todos[0].title, 'Buy milk');
        assert.strictEqual(result.todos[0].completed, false);
    });

    test('should add multiple todos and verify all appear', () => {
        localStorage.clear();

        simulateAddTodo('Todo 1');
        simulateAddTodo('Todo 2');
        const result = simulateAddTodo('Todo 3');

        assert.strictEqual(result.todos.length, 3);
        assert.strictEqual(result.todos[0].title, 'Todo 1');
        assert.strictEqual(result.todos[1].title, 'Todo 2');
        assert.strictEqual(result.todos[2].title, 'Todo 3');
    });

    test('should reject empty todo', () => {
        localStorage.clear();

        const result = simulateAddTodo('');

        assert.strictEqual(result.success, false);
        assert.ok(result.message.length > 0);
    });

    test('should reject whitespace-only todo', () => {
        localStorage.clear();

        const result = simulateAddTodo('   ');

        assert.strictEqual(result.success, false);
        assert.ok(result.message.length > 0);
    });
});

describe('Edit and Update Integration', () => {
    test('should edit and update todo with valid title', () => {
        localStorage.clear();

        // Add initial todo
        simulateAddTodo('Original Title');

        // Update it
        const result = simulateUpdateTodo(0, 'Updated Title');

        assert.strictEqual(result.success, true);
        assert.strictEqual(result.todos.length, 1);
        assert.strictEqual(result.todos[0].title, 'Updated Title');
    });

    test('should verify no duplicate created when updating', () => {
        localStorage.clear();

        // Add initial todo
        simulateAddTodo('Original Title');

        // Update it
        const result = simulateUpdateTodo(0, 'Updated Title');

        assert.strictEqual(result.todos.length, 1);
    });

    test('should reject invalid title during update', () => {
        localStorage.clear();

        // Add initial todo
        simulateAddTodo('Original Title');

        // Attempt to update with empty title
        const result = simulateUpdateTodo(0, '');

        assert.strictEqual(result.success, false);
        assert.ok(result.message.length > 0);
    });

    test('should preserve todo on update rejection', () => {
        localStorage.clear();

        // Add initial todo
        simulateAddTodo('Original Title');

        // Attempt to update with invalid title
        simulateUpdateTodo(0, '');

        // Verify original remains
        const todos = loadTodos();
        assert.strictEqual(todos[0].title, 'Original Title');
    });
});

describe('Cancel Edit Integration', () => {
    test('should cancel edit and verify original unchanged', () => {
        localStorage.clear();

        // Add initial todo
        simulateAddTodo('Original Title');

        // Simulate cancel by not persisting changes
        const todos = loadTodos();
        const originalTitle = todos[0].title;

        // Verify reload preserves original
        const reloadedTodos = loadTodos();
        assert.strictEqual(reloadedTodos[0].title, originalTitle);
    });

    test('should verify canceled changes are not persisted', () => {
        localStorage.clear();

        // Add initial todo
        simulateAddTodo('Original Title');

        // Load todos (simulates edit start)
        const beforeEdit = loadTodos();
        const originalTitle = beforeEdit[0].title;

        // Don't save changes (simulates cancel)

        // Reload and verify
        const afterCancel = loadTodos();
        assert.strictEqual(afterCancel[0].title, originalTitle);
    });
});

describe('Complete/Incomplete Integration', () => {
    test('should mark incomplete todo as completed', () => {
        localStorage.clear();

        // Add todo
        simulateAddTodo('Test Todo');

        // Mark as completed
        const result = simulateCompleteTodo(0, true);

        assert.strictEqual(result.success, true);
        assert.strictEqual(result.todos[0].completed, true);
    });

    test('should mark completed todo as incomplete', () => {
        localStorage.clear();

        // Add and complete todo
        simulateAddTodo('Test Todo');
        simulateCompleteTodo(0, true);

        // Mark as incomplete
        const result = simulateCompleteTodo(0, false);

        assert.strictEqual(result.success, true);
        assert.strictEqual(result.todos[0].completed, false);
    });

    test('should persist completion changes', () => {
        localStorage.clear();

        // Add todo
        simulateAddTodo('Test Todo');

        // Complete it
        simulateCompleteTodo(0, true);

        // Reload and verify
        const todos = loadTodos();
        assert.strictEqual(todos[0].completed, true);
    });
});

describe('Delete Integration', () => {
    test('should delete todo and verify it is gone', () => {
        localStorage.clear();

        // Add todos
        simulateAddTodo('Todo 1');
        simulateAddTodo('Todo 2');
        simulateAddTodo('Todo 3');

        // Delete middle one
        const result = simulateDeleteTodo(1);

        assert.strictEqual(result.todos.length, 2);
        assert.strictEqual(result.todos[0].title, 'Todo 1');
        assert.strictEqual(result.todos[1].title, 'Todo 3');
    });

    test('should verify other todos unaffected', () => {
        localStorage.clear();

        // Add todos
        simulateAddTodo('Todo 1');
        simulateAddTodo('Todo 2');
        simulateAddTodo('Todo 3');

        // Delete one
        simulateDeleteTodo(1);

        // Verify others remain correct
        const todos = loadTodos();
        assert.strictEqual(todos[0].title, 'Todo 1');
        assert.strictEqual(todos[0].completed, false);
        assert.strictEqual(todos[1].title, 'Todo 3');
        assert.strictEqual(todos[1].completed, false);
    });

    test('should persist deletion', () => {
        localStorage.clear();

        // Add todos
        simulateAddTodo('Todo 1');
        simulateAddTodo('Todo 2');

        // Delete one
        simulateDeleteTodo(0);

        // Reload and verify
        const todos = loadTodos();
        assert.strictEqual(todos.length, 1);
        assert.strictEqual(todos[0].title, 'Todo 2');
    });
});

describe('Persistence Behavior Integration', () => {
    test('should persist added todo across reload', () => {
        localStorage.clear();

        // Add todo
        simulateAddTodo('Test Todo');

        // Simulate reload
        const todos = loadTodos();

        assert.strictEqual(todos.length, 1);
        assert.strictEqual(todos[0].title, 'Test Todo');
    });

    test('should persist updated todo across reload', () => {
        localStorage.clear();

        // Add and update todo
        simulateAddTodo('Original');
        simulateUpdateTodo(0, 'Updated');

        // Simulate reload
        const todos = loadTodos();

        assert.strictEqual(todos[0].title, 'Updated');
    });

    test('should persist completion status across reload', () => {
        localStorage.clear();

        // Add and complete todo
        simulateAddTodo('Test Todo');
        simulateCompleteTodo(0, true);

        // Simulate reload
        const todos = loadTodos();

        assert.strictEqual(todos[0].completed, true);
    });

    test('should persist deletion across reload', () => {
        localStorage.clear();

        // Add todos and delete one
        simulateAddTodo('Todo 1');
        simulateAddTodo('Todo 2');
        simulateDeleteTodo(0);

        // Simulate reload
        const todos = loadTodos();

        assert.strictEqual(todos.length, 1);
        assert.strictEqual(todos[0].title, 'Todo 2');
    });

    test('should handle empty storage on initial load', () => {
        localStorage.clear();

        const todos = loadTodos();

        assert.ok(Array.isArray(todos));
        assert.strictEqual(todos.length, 0);
    });
});
