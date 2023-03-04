module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': 0,
    'no-unused-vars': 0,
    'react/prop-types': 0,
    'no-restricted-exports': 0,
    'no-plusplus': 0,
    'consistent-return': 0,
    'react/no-array-index-key': 0,
    'no-continue': 0,
    'no-shadow': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
  },
};
