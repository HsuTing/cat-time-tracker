module.exports = {
  testPathIgnorePatterns: [
    '/node_modules/',
    '/lib/',
    '/utils/'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/*.js',
    '!src/firebase/*.js',
    '!**/__generated__/**',
    '!**/node_modules/**',
    '!src/bin/*.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'html',
    'text'
  ]
};
