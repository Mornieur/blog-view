const createJestConfig = require('jest-create-config');

/** @type {import('jest').Config} */
const config = createJestConfig({
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],

  transformOptions: {
    presets: ['@babel/preset-react', '@babel/preset-typescript'],
    plugins: [
      'babel-plugin-transform-react-jsx-source',
      'babel-plugin-transform-typescript-metadata',
    ],
  },

  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}'],
  coverageReporters: ['json', 'lcov', 'text-summary'],
});

module.exports = config;
