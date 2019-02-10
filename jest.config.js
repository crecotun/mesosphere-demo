module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
}
