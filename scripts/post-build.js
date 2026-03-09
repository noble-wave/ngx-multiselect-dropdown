#!/usr/bin/env node

/**
 * Post-build script for npm package optimization
 * 
 * This script:
 * 1. Adds explicit "files" field to dist/package.json
 * 2. Ensures only necessary files are published to npm
 * 3. Updates package name to scoped version
 * 4. Validates package.json metadata
 */

const fs = require('fs');
const path = require('path');

const DIST_PATH = path.join(__dirname, '..', 'dist', 'ngx-multiselect-dropdown');
const PACKAGE_JSON_PATH = path.join(DIST_PATH, 'package.json');

console.log('🔧 Running post-build optimization...\n');

// Read the package.json
const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));

// Add explicit files field for npm publish control
packageJson.files = [
  'fesm2022',
  'types',
  '*.d.ts',
  '*.md',
  'LICENSE'
];

// Update to scoped package name
packageJson.name = '@noble-wave/ngx-multiselect-dropdown';

// Ensure all required metadata is present
if (!packageJson.repository) {
  console.error('❌ Error: repository field is missing');
  process.exit(1);
}

if (!packageJson.license) {
  console.error('❌ Error: license field is missing');
  process.exit(1);
}

if (!packageJson.keywords || packageJson.keywords.length === 0) {
  console.error('⚠️  Warning: keywords field is empty or missing');
}

// Write the optimized package.json
fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2));

console.log('✅ Package name updated to:', packageJson.name);
console.log('✅ Files field added with', packageJson.files.length, 'entries');
console.log('✅ Package.json optimized successfully\n');

// Display what will be published
console.log('📦 Package will include:');
const files = fs.readdirSync(DIST_PATH);
files.forEach(file => {
  const stats = fs.statSync(path.join(DIST_PATH, file));
  if (stats.isFile()) {
    console.log(`   - ${file}`);
  } else {
    console.log(`   - ${file}/`);
  }
});

console.log('\n✨ Post-build optimization complete!\n');
