import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@game/(.*)$': '<rootDir>/src/game/$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/assets/images/(.*)$': '<rootDir>/src/assets/images/$1',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/mocks/fileMock.js',
    '\\.(mp3)$': '<rootDir>/mocks/fileMock.js',
  },
  transform: {
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  transformIgnorePatterns: [
    'node_modules/(?!(.*@gravity-ui/uikit.*)/)', // Исключаем @gravity-ui/uikit из игнорирования
  ],
}
