import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  { ignores: ['dist', 'nodu_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettierRecommended],
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      semi: ['error', 'always'],
      'no-console': 'error',
      'no-dupe-keys': 2,
      'no-empty-pattern': 2,
      'no-sparse-arrays': 2,
      'no-use-before-define': 2,
      'no-unused-vars': 2,
      'block-scoped-var': 2,
      'default-case': 2,
      eqeqeq: ['error', 'always'],
      'new-cap': ['error', { newIsCap: true }],
      'no-var': 'error',
      'prefer-const': 'error',
      'sort-keys': ['error', 'asc', { natural: true }],
      '@typescript-eslint/no-explicit-any': ['off'],
    },
  },
);
