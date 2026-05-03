module.exports = {
  testEnvironment: 'node',
  transform: {},
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: { lines: 60, functions: 60, branches: 55 },
  },
};
