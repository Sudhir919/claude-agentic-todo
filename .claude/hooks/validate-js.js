#!/usr/bin/env node

/**
 * JavaScript Syntax Validation Hook
 *
 * Validates JavaScript syntax using Node.js --check after file modifications.
 * Exits successfully if app.js doesn't exist yet (allows early-phase work).
 * Exits with error if app.js exists but has syntax errors.
 */

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const APP_JS_PATH = path.join(__dirname, '..', '..', 'app.js');

// Check if app.js exists
if (!fs.existsSync(APP_JS_PATH)) {
    console.log('✓ Validation skipped: app.js not yet created');
    process.exit(0);
}

try {
    // Run Node.js syntax check
    execSync(`node --check "${APP_JS_PATH}"`, {
        encoding: 'utf-8',
        stdio: 'pipe'
    });

    console.log('✓ JavaScript syntax validation passed');
    process.exit(0);
} catch (error) {
    console.error('✗ JavaScript syntax validation failed:');
    console.error(error.stderr || error.message);
    process.exit(1);
}
