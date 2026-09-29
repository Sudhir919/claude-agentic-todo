#!/usr/bin/env node
/**
 * Post-Verification PR Creation Hook
 *
 * This hook is triggered after tool use and checks if:
 * 1. The verification skill just completed
 * 2. The verification-report.md shows READY FOR PR status
 *
 * If both conditions are met, it triggers the automated PR creation workflow.
 *
 * This is NOT a validation hook - it doesn't block or validate.
 * It's an automation hook that creates the PR after verification completes.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get project root (two levels up from .claude/hooks/)
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const VERIFICATION_REPORT = path.join(PROJECT_ROOT, 'verification-report.md');
const LOG_FILE = path.join(PROJECT_ROOT, '.claude', 'logs', 'post-verification.log');
const TRIGGER_FILE = path.join(PROJECT_ROOT, '.claude', 'logs', 'pr-trigger.flag');

// Ensure logs directory exists
const logsDir = path.dirname(LOG_FILE);
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

/**
 * Log message to file and stdout
 */
function log(message) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(LOG_FILE, logLine);
  console.log(message);
}

/**
 * Check if verification just completed with READY FOR PR status
 */
function shouldTriggerPR() {
  // Check if verification-report.md exists
  if (!fs.existsSync(VERIFICATION_REPORT)) {
    return false;
  }

  // Read verification report
  const reportContent = fs.readFileSync(VERIFICATION_REPORT, 'utf8');

  // Check if status is READY FOR PR
  if (!reportContent.includes('READY FOR PR')) {
    return false;
  }

  // Check if we've already triggered PR creation for this verification
  // (avoid duplicate triggers)
  if (fs.existsSync(TRIGGER_FILE)) {
    const triggerTime = fs.statSync(TRIGGER_FILE).mtime;
    const reportTime = fs.statSync(VERIFICATION_REPORT).mtime;

    // If trigger file is newer than report, we already processed this
    if (triggerTime >= reportTime) {
      return false;
    }
  }

  return true;
}

/**
 * Trigger PR creation workflow
 */
function triggerPRCreation() {
  try {
    log('========================================');
    log('Post-Verification PR Hook Triggered');
    log('========================================');
    log('Verification status: READY FOR PR');
    log('Initiating automated PR creation...');

    // Create trigger flag to prevent duplicate runs
    fs.writeFileSync(TRIGGER_FILE, new Date().toISOString());

    // Execute the auto-pr script
    const scriptPath = path.join(PROJECT_ROOT, '.claude', 'scripts', 'auto-create-pr.sh');

    // Check if script exists
    if (!fs.existsSync(scriptPath)) {
      log(`ERROR: Script not found: ${scriptPath}`);
      log('Please ensure .claude/scripts/auto-create-pr.sh exists');
      return;
    }

    log(`Executing: ${scriptPath}`);
    log('----------------------------------------');

    // Execute the script
    const result = execSync(`bash "${scriptPath}"`, {
      cwd: PROJECT_ROOT,
      encoding: 'utf8',
      stdio: 'pipe'
    });

    log('----------------------------------------');
    log('Script output:');
    log(result);
    log('========================================');
    log('✓ Automated PR creation completed');
    log('========================================');

  } catch (error) {
    log('========================================');
    log('ERROR: PR creation failed');
    log('========================================');
    log(`Error: ${error.message}`);
    if (error.stdout) {
      log('Stdout:');
      log(error.stdout);
    }
    if (error.stderr) {
      log('Stderr:');
      log(error.stderr);
    }
    log('========================================');

    // Remove trigger flag so it can be retried
    if (fs.existsSync(TRIGGER_FILE)) {
      fs.unlinkSync(TRIGGER_FILE);
    }
  }
}

/**
 * Main execution
 */
function main() {
  // Read hook context from environment or stdin
  // For now, we'll just check the verification status

  if (shouldTriggerPR()) {
    triggerPRCreation();
  }
}

// Execute
main();
