/* eslint max-len: 0 */

const TEST = process.env.TEST || 'unit';

module.exports = {
  // rootDir: process.cwd(), // required if this file is not stored in project root
  // verbose: true, // use --verbose in package.json.script
  name: 'tests',
  displayName: 'tests',
  resetMocks: true,
  setupFiles: [],
  testMatch: [
    TEST === 'unit' ? '<rootDir>/src/**/__tests__/**/*.unit.(spec|test).js?(x)' : '',
    TEST === 'unit' ? '<rootDir>/server/**/__tests__/**/*.unit.(spec|test).js?(x)' : '',
    TEST === 'unit' ? '<rootDir>/src/**/?(*.unit.)(spec|test).js?(x)' : '',
    TEST === 'it' ? '<rootDir>/test/**/?(*.integration.)(spec|test).js?(x)' : '',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tools/jest/file.mock.js',
    '\\.(css|scss|less)$': '<rootDir>/tools/jest/style.mock.js'
  },
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/coverage/',
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/public/',
    '<rootDir>/server/middlewares',
    '<rootDir>/tools/',
  ],
  globals: {
    __DEV__: true
  },
  moduleFileExtensions: [
    'js',
    'json',
  ],
  transform: {
    '^.+\\.js?$': 'babel-jest'
  },
  testURL: 'http://localhost',
  modulePaths: [
    'src'
  ],
};


