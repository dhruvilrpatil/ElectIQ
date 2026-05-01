/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',
  transform: {},
  // Tell Jest to handle .js files as ESM (since package.json has "type": "module")
  extensionsToTreatAsEsm: [],
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js',
  ],
  coverageThreshold: {
    global: {
      lines: 60,
      functions: 60,
    },
  },
  testTimeout: 15000,
  // Prevent Jest from trying to parse node_modules
  transformIgnorePatterns: ['node_modules'],
};
