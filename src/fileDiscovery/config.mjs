//===================
// Import
//===================


//===================
// Export
//===================
// JS files to be excluded from the analysis
export const IGNORE_JS = Object.freeze([
  '.config.js',
  '.config.ts',
  '.test.js',
  '.test.ts',
  '.spec.js',
  '.spec.ts',
  '.cy.js',
  '.cy.ts',
  '.mock.js',
  '.mock.ts',
]);

export const IGNORE_DIRS = Object.freeze([
  'node_modules',
  'dist',
  'build',
  '__tests__',
  'cypress',
  'e2e',
  'tests',
  'config',
  'backend'
]);