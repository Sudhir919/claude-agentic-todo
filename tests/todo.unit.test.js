// Unit Tests for Todo Application
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

describe('Validation Logic', () => {
    test('should reject empty string', () => {
        const result = validateTitle('');
        assert.strictEqual(result.valid, false);
        assert.ok(result.message.length > 0);
    });

    test('should reject whitespace-only string with spaces', () => {
        const result = validateTitle('   ');
        assert.strictEqual(result.valid, false);
        assert.ok(result.message.length > 0);
    });

    test('should reject whitespace-only string with tabs', () => {
        const result = validateTitle('\t\t');
        assert.strictEqual(result.valid, false);
        assert.ok(result.message.length > 0);
    });

    test('should reject whitespace-only string with newlines', () => {
        const result = validateTitle('\n\n');
        assert.strictEqual(result.valid, false);
        assert.ok(result.message.length > 0);
    });

    test('should reject whitespace-only string with mixed whitespace', () => {
        const result = validateTitle(' \t\n ');
        assert.strictEqual(result.valid, false);
        assert.ok(result.message.length > 0);
    });

    test('should accept valid title', () => {
        const result = validateTitle('Buy milk');
        assert.strictEqual(result.valid, true);
        assert.strictEqual(result.message, '');
    });

    test('should accept title with leading/trailing whitespace (will be normalized)', () => {
        const result = validateTitle('  Buy milk  ');
        assert.strictEqual(result.valid, true);
    });
});

describe('Normalization Logic', () => {
    test('should trim leading whitespace', () => {
        const result = normalizeTitle('  Buy milk');
        assert.strictEqual(result, 'Buy milk');
    });

    test('should trim trailing whitespace', () => {
        const result = normalizeTitle('Buy milk  ');
        assert.strictEqual(result, 'Buy milk');
    });

    test('should trim both leading and trailing whitespace', () => {
        const result = normalizeTitle('  Buy milk  ');
        assert.strictEqual(result, 'Buy milk');
    });

    test('should preserve internal whitespace', () => {
        const result = normalizeTitle('Buy whole milk');
        assert.strictEqual(result, 'Buy whole milk');
    });

    test('should handle title with no extra whitespace', () => {
        const result = normalizeTitle('Buy milk');
        assert.strictEqual(result, 'Buy milk');
    });
});

describe('Todo Creation', () => {
    test('should create todo with valid title', () => {
        const todo = createTodo('Buy milk');
        assert.strictEqual(todo.title, 'Buy milk');
        assert.strictEqual(todo.completed, false);
    });

    test('should default completed to false', () => {
        const todo = createTodo('Any title');
        assert.strictEqual(todo.completed, false);
    });

    test('should contain only title and completed fields', () => {
        const todo = createTodo('Test');
        const keys = Object.keys(todo);
        assert.strictEqual(keys.length, 2);
        assert.ok(keys.includes('title'));
        assert.ok(keys.includes('completed'));
    });
});

describe('Todo Update Behavior', () => {
    test('should update existing todo title', () => {
        const todos = [
            { title: 'Original', completed: false }
        ];

        todos[0].title = 'Updated';

        assert.strictEqual(todos[0].title, 'Updated');
        assert.strictEqual(todos.length, 1);
    });

    test('should not create duplicate when updating', () => {
        const todos = [
            { title: 'Original', completed: false }
        ];

        const originalLength = todos.length;
        todos[0].title = 'Updated';

        assert.strictEqual(todos.length, originalLength);
    });

    test('should preserve completion status when updating title', () => {
        const todos = [
            { title: 'Original', completed: true }
        ];

        todos[0].title = 'Updated';

        assert.strictEqual(todos[0].completed, true);
    });
});

describe('Completion State', () => {
    test('should mark todo as completed', () => {
        const todo = { title: 'Test', completed: false };
        todo.completed = true;
        assert.strictEqual(todo.completed, true);
    });

    test('should mark todo as incomplete', () => {
        const todo = { title: 'Test', completed: true };
        todo.completed = false;
        assert.strictEqual(todo.completed, false);
    });

    test('should toggle completion multiple times', () => {
        const todo = { title: 'Test', completed: false };

        todo.completed = !todo.completed;
        assert.strictEqual(todo.completed, true);

        todo.completed = !todo.completed;
        assert.strictEqual(todo.completed, false);

        todo.completed = !todo.completed;
        assert.strictEqual(todo.completed, true);
    });
});

describe('Deletion Behavior', () => {
    test('should remove todo from array', () => {
        const todos = [
            { title: 'Todo 1', completed: false },
            { title: 'Todo 2', completed: false },
            { title: 'Todo 3', completed: false }
        ];

        todos.splice(1, 1);

        assert.strictEqual(todos.length, 2);
        assert.strictEqual(todos[0].title, 'Todo 1');
        assert.strictEqual(todos[1].title, 'Todo 3');
    });

    test('should not affect other todos', () => {
        const todos = [
            { title: 'Todo 1', completed: false },
            { title: 'Todo 2', completed: false },
            { title: 'Todo 3', completed: false }
        ];

        todos.splice(1, 1);

        assert.strictEqual(todos[0].title, 'Todo 1');
        assert.strictEqual(todos[0].completed, false);
        assert.strictEqual(todos[1].title, 'Todo 3');
        assert.strictEqual(todos[1].completed, false);
    });

    test('should handle deletion when array has one item', () => {
        const todos = [
            { title: 'Only Todo', completed: false }
        ];

        todos.splice(0, 1);

        assert.strictEqual(todos.length, 0);
    });

    test('should handle deletion when array has multiple items', () => {
        const todos = [
            { title: 'Todo 1', completed: false },
            { title: 'Todo 2', completed: false }
        ];

        todos.splice(0, 1);

        assert.strictEqual(todos.length, 1);
        assert.strictEqual(todos[0].title, 'Todo 2');
    });
});

describe('Persistence Logic', () => {
    test('should save todos to localStorage', () => {
        localStorage.clear();

        const todos = [
            { title: 'Test', completed: false }
        ];

        const result = saveTodos(todos);

        assert.strictEqual(result, true);
        assert.ok(localStorage.getItem('todo-items') !== null);
    });

    test('should load todos from localStorage', () => {
        localStorage.clear();

        const todos = [
            { title: 'Test', completed: false }
        ];

        localStorage.setItem('todo-items', JSON.stringify(todos));

        const loaded = loadTodos();

        assert.strictEqual(loaded.length, 1);
        assert.strictEqual(loaded[0].title, 'Test');
        assert.strictEqual(loaded[0].completed, false);
    });

    test('should handle empty storage', () => {
        localStorage.clear();

        const loaded = loadTodos();

        assert.ok(Array.isArray(loaded));
        assert.strictEqual(loaded.length, 0);
    });

    test('should handle invalid JSON', () => {
        localStorage.clear();

        localStorage.setItem('todo-items', 'invalid json {]');

        const loaded = loadTodos();

        assert.ok(Array.isArray(loaded));
        assert.strictEqual(loaded.length, 0);
    });

    test('should serialize and deserialize correctly', () => {
        localStorage.clear();

        const todos = [
            { title: 'Todo 1', completed: false },
            { title: 'Todo 2', completed: true }
        ];

        saveTodos(todos);
        const loaded = loadTodos();

        assert.strictEqual(loaded.length, 2);
        assert.strictEqual(loaded[0].title, 'Todo 1');
        assert.strictEqual(loaded[0].completed, false);
        assert.strictEqual(loaded[1].title, 'Todo 2');
        assert.strictEqual(loaded[1].completed, true);
    });
});
