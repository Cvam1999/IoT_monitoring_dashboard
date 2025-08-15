export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '.*\.spec\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: './',
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '^(.*)\.js$': '$1'
  }
}
