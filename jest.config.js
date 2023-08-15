module.exports = {
    roots: ['<rootDir>'],
    globals: {
        'ts-jest': {
          tsconfig: 'tsconfig.jest.json'
        }
      },
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
    },
   // setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // setupFiles before v9
  };