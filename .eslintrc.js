module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
  },
  plugins: ['prettier', '@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'prettier/prettier': 'error',
    // '@typescript-eslint/no-explicit-any': 'off',
    //  "@typescript-eslint/no-var-requires": "off",
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/no-empty-function': 'off',
  },
};
