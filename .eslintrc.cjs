module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "quotes": ["error", "double"],
    "camelcase": "error",
    "semi": [1, "always"],
    "no-unused-vars": "warn",
    "react-hooks/rules-of-hooks": "off",
    "no-irregular-whitespace": "warn",
    "no-undef": "warn",
    "react/prop-types": "off"
  },
}
