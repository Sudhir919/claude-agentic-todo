# Hooks

## Purpose

This directory contains Git hooks and quality automation hooks for the Claude Agentic Todo project.

## Available Hooks

### validate-js.js

**Type**: PostToolUse Hook (triggered after Write/Edit operations)

**Purpose**: Automatically validates JavaScript syntax using Node.js after file modifications.

**Behavior**:
- If `app.js` doesn't exist yet, exits successfully (allows Requirements, Architecture, Design phases to proceed)
- If `app.js` exists, runs `node --check app.js` to validate syntax
- Exits with success (0) if syntax is valid
- Exits with error (1) if syntax errors are detected

**Usage**: Automatically executed by Claude Code's hook system when configured in `.claude/settings.json`

**Manual Execution**:
```bash
node .claude/hooks/validate-js.js
```

**Benefits**:
- Immediate feedback on syntax errors
- Prevents invalid JavaScript from being committed
- Does not modify application files
- Lightweight (no external dependencies beyond Node.js built-ins)
- Safe for early SDLC phases (gracefully skips if app.js not created yet)

## Hook Configuration

Hooks are configured in `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/hooks/validate-js.js"
          }
        ]
      }
    ]
  }
}
```

This configuration tells Claude Code to run the validation hook after any Write or Edit tool operation.

## Development Guidelines

When creating new hooks:
- Keep hooks lightweight and fast
- Exit with code 0 for success, non-zero for failure
- Provide clear error messages
- Handle missing files gracefully
- Do not modify application files from hooks
- Document hook purpose and behavior in this README
