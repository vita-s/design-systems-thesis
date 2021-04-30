process.env.VUE_CLI_BABEL_TARGET_NODE = true
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true

module.exports = {
  moduleFileExtensions: ['ts', 'js', 'json', 'vue'],
  collectCoverage: false,
  coverageReporters: ['json', 'html'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^lib/(.*)$': '<rootDir>/lib/$1'
  },

  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.ts$': 'ts-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    '^.+\\.svg$': '<rootDir>/jest-svg-transform.js',
    '.+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$': 'jest-transform-stub'
  },

  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!text-mask-addons|vue2-daterange-picker)'
  ],
  testPathIgnorePatterns: ['<rootDir>/.stage/'],
  setupFilesAfterEnv: ['<rootDir>/src/setupJest.js'],
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel'
}
