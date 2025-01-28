#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the project name from command line arguments
const projectName = process.argv[2] || 'my-lumina-app';

// Define paths
const currentDir = process.cwd();
const targetDir = path.join(currentDir, projectName);

// Important: Set sourceDir to the parent directory of bin
const sourceDir = path.join(__dirname, '..');

// Check if project name is provided
if (!projectName) {
  console.error('Please specify the project name:');
  console.error('  npx create-lumina-app <project-name>');
  process.exit(1);
}

// Create target directory
fs.mkdirSync(targetDir, { recursive: true });

// Template for package.json with dynamic project name
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
    '@tailwindcss/cli': '^4.0.0',
    'cookie-parser': '^1.4.7',
    cors: '^2.8.5',
    dotenv: '^16.4.7',
    express: '^4.21.2',
    fs: '^0.0.1-security',
    mongoose: '^8.9.5',
    nodemon: '^3.1.9',
    path: '^0.12.7',
    tailwindcss: '^4.0.0',
  },
  devDependencies: {
    concurrently: '^9.1.2',
  },
};

fs.writeFileSync(
  path.join(targetDir, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);

// Function to check if a path should be ignored
function shouldIgnorePath(path) {
  const ignoreList = [
    'bin',
    'node_modules',
    '.git',
    'package-lock.json',
    '.vscode',
    'package.json',
  ];
  return ignoreList.some((item) => path.includes(item));
}

// Function to recursively copy directory
function copyDirectoryRecursive(source, destination) {
  if (shouldIgnorePath(source)) {
    return;
  }

  fs.mkdirSync(destination, { recursive: true });

  const items = fs.readdirSync(source);

  for (const item of items) {
    if (shouldIgnorePath(item)) {
      continue;
    }

    const sourcePath = path.join(source, item);
    const targetPath = path.join(destination, item);

    const stats = fs.statSync(sourcePath);

    if (stats.isDirectory()) {
      copyDirectoryRecursive(sourcePath, targetPath);
    } else if (stats.isFile()) {
      if (item === 'package.json') {
        // Read the original package.json
        const packageData = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
        // Update the name to create-lumina-app while keeping other fields
        packageData.name = 'create-lumina-app';
        // Write the modified package.json
        fs.writeFileSync(targetPath, JSON.stringify(packageData, null, 2));
      } else {
        fs.copyFileSync(sourcePath, targetPath);
      }
    }
  }
}

// Copy project files
try {
  copyDirectoryRecursive(sourceDir, targetDir);
  console.log(`Project "${projectName}" created successfully in ${targetDir}!`);

  // Install dependencies
  console.log('Installing dependencies...');
  execSync(`cd ${projectName} && npm install`, { stdio: 'inherit' });
  console.log('All done! Happy coding with lumina 🎉');
} catch (error) {
  console.error('Error creating project:', error);
  process.exit(1);
}
