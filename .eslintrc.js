module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  'plugins': ['@typescript-eslint', 'import'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    'import/order': [
      'warn',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
          'unknown'
        ],
        'pathGroups': [
          {
            'pattern': '*.?(s)css',
            'group': 'unknown',
            'patternOptions': { 'matchBase': true },
            'position': 'after'
          }
        ],
        'distinctGroup': false,
        'newlines-between': 'never',
        'alphabetize': {
          'order': 'asc',
          'orderImportKind': 'asc'
        },
        'warnOnUnassignedImports': true
      }
    ]
  },
}
