module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  setupFiles: ['./__tests__/setup.ts'],
  roots: ['<rootDir>/__tests__'],
  verbose: true,
};
