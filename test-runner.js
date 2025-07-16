const { spawn } = require('child_process');
const path = require('path');

async function runTests() {
  console.log('🚀 Starting iShares Regression Test Suite...\n');
  
  const testCommand = spawn('npx', ['cucumber-js'], {
    cwd: path.resolve(__dirname),
    stdio: 'inherit'
  });

  testCommand.on('close', (code) => {
    if (code === 0) {
      console.log('\n✅ All tests completed successfully!');
    } else {
      console.log(`\n❌ Tests failed with exit code ${code}`);
    }
    process.exit(code);
  });

  testCommand.on('error', (error) => {
    console.error('❌ Failed to start test runner:', error);
    process.exit(1);
  });
}

if (require.main === module) {
  runTests();
}

module.exports = { runTests };
