/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  extends: [
    'eslint:recommended',
  ],
  plugins: ['react', 'react-hooks'],
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'warn',
    'no-var': 'error',
  },
  overrides: [
    {
      files: ['frontend/src/**/*.{js,jsx}'],
      plugins: ['react', 'react-hooks'],
      rules: {
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
      },
    },
    {
      files: ['backend/src/**/*.js'],
      env: { node: true, browser: false },
    },
    {
      files: ['**/*.test.{js,jsx}', '**/__tests__/**/*.{js,jsx}'],
      env: { jest: true },
    },
  ],
  settings: {
    react: { version: 'detect' },
  },
};
