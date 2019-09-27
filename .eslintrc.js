module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  env: {
    jest: true,
  },
  rules: {
    // prefer defining functions in order of importance. functions are hoisted
    // so it is fine to define one after it is used
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
  },
};
