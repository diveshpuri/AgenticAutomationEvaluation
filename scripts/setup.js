const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function createDirectories() {
  const dirs = ['reports', 'screenshots', 'downloads'];
  
  dirs.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`✅ Created directory: ${dir}`);
    }
  });
}

function installDependencies() {
  console.log('📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully');
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }
}

function installPlaywrightBrowsers() {
  console.log('🌐 Installing Playwright browsers...');
  try {
    execSync('npx playwright install', { stdio: 'inherit' });
    console.log('✅ Playwright browsers installed successfully');
  } catch (error) {
    console.error('❌ Failed to install Playwright browsers:', error.message);
    process.exit(1);
  }
}

function main() {
  console.log('🔧 Setting up iShares Regression Testing Framework...\n');
  
  createDirectories();
  installDependencies();
  installPlaywrightBrowsers();
  
  console.log('\n🎉 Setup completed successfully!');
  console.log('\nNext steps:');
  console.log('1. Run tests: npm test');
  console.log('2. Run specific test suite: npm run test:search');
  console.log('3. Run in debug mode: npm run test:debug');
}

if (require.main === module) {
  main();
}
