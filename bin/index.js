#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the project name from command line arguments
const projectName = process.argv[2] || 'my-lumina-app';

// Define paths
const currentDir = process.cwd();
const targetDir = path.join(currentDir, projectName);
const sourceDir = path.join(__dirname, '..');

console.log('Welcome to lumina! 🫡');

if (!projectName) {
  console.error('⚠️ Please specify the project name:');
  console.error('  npx create-lumina-app <project-name>');
  process.exit(1);
}

// Create target directory
fs.mkdirSync(targetDir, { recursive: true });

// Template for package.json
const packageJson = {
  name: projectName,
  version: '1.0.0',
  description: 'Lumina is an fullStack SPA maker',
  main: 'index.js',
  scripts: {
    start:
      'concurrently "nodemon server.js" "npx @tailwindcss/cli -i ./assets/css/index.css -o ./assets/css/tailwindOutput.css --watch"',
  },
  type: 'module',
  author: 'Kiarash Alizadeh',
  license: 'MIT',
  dependencies: {
    'create-lumina': '^1.2.1',
    'cookie-parser': '^1.4.7',
    cors: '^2.8.5',
    dotenv: '^16.4.7',
    express: '^4.21.2',
    fs: '^0.0.1-security',
    mongoose: '^8.9.5',
    path: '^0.12.7',
  },
  devDependencies: {
    '@tailwindcss/cli': '^4.0.0',
    concurrently: '^9.1.2',
    nodemon: '^3.1.9',
    sass: '^1.83.4',
    tailwindcss: '^4.0.0',
  },
};

// Write package.json
fs.writeFileSync(
  path.join(targetDir, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);

// Function to copy a directory recursively
function copyDir(src, dest) {
  // Create destination directory
  fs.mkdirSync(dest, { recursive: true });

  // Read source directory content
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy directory
      copyDir(srcPath, destPath);
    } else {
      // Copy file
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Function to copy specific folders and files
async function copyTemplateFiles() {
  // Define what to copy
  const foldersToCopy = ['api', 'assets', 'components'];
  const filesToCopy = [
    'app.js',
    'index.html',
    'server.js',
    'LICENSE',
    'lumina.config.js',
    'README.md',
    'routes.js',
  ];

  try {
    // Copy folders
    for (const folder of foldersToCopy) {
      const srcFolder = path.join(sourceDir, folder);
      const destFolder = path.join(targetDir, folder);

      if (fs.existsSync(srcFolder)) {
        copyDir(srcFolder, destFolder);
      } else {
        console.warn(`⚠️ Warning: Could not find folder: ${folder}`);
      }
    }

    // Copy individual files
    for (const file of filesToCopy) {
      const srcFile = path.join(sourceDir, file);
      const destFile = path.join(targetDir, file);

      if (fs.existsSync(srcFile)) {
        fs.copyFileSync(srcFile, destFile);
      } else {
        console.warn(`⚠️ Warning: Could not find file: ${file}`);
      }
    }

    // Create .env file
    const envContent = 'DATABASE_URL="mongodb://127.0.0.1:27017/lumina"\n';
    fs.writeFileSync(path.join(targetDir, '.env'), envContent);

    return true;
  } catch (error) {
    console.error('⚠️ Error copying template files:', error);
    return false;
  }
}

// Main execution
try {
  console.log(`🏗️ Creating new Lumina project in ${targetDir}...`);

  // Copy template files
  const success = await copyTemplateFiles();
  if (!success) {
    throw new Error('Failed to copy template files');
  }

  // Install dependencies
  console.log('\n⏳ Installing dependencies...');
  execSync(`cd ${projectName} && npm install`, { stdio: 'inherit' });

  console.log('\n✨ Success! Your Lumina project is ready!');
  console.log(`\n🏁 Created ${projectName} at ${targetDir}`);
  console.log('\nInside that directory, you can run these commands:');
  console.log('\n✅  npm start');
  console.log('\nStarts the development server.');
  console.log('\nHappy coding with Lumina! 🎉');
} catch (error) {
  console.error('⚠️ Error creating project:', error);
  process.exit(1);
}
