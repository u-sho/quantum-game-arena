const isProduction = () => process.env.NODE_ENV === 'production';

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
    ecmaFeatures: {
      jsx: true
    },
    project: 'tsconfig.json'
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'no-console': isProduction() ? 'error' : 'off',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'no-duplicate-imports': 'error',
    'no-unused-expressions': 'error',
    'no-var': 'error',
    'prefer-const': 'error',

    'no-restricted-imports': [
      'error',
      {
        patterns: [
          '../*',
          'components/*', // use '@c/*' instead 
          'styles/*', // use '@s/*' instead
        ]
      }
    ],
    'react/boolean-prop-naming': 'error',
    'react/react-in-jsx-scope': 'off',

    // a11y
    'jsx-a11y/anchor-is-valid': 'off',

    // format
    'react/jsx-curly-spacing': 'error',
    'react/jsx-equals-spacing': 'error',
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-tag-spacing': [
      'error',
      {
        closingSlash: "never",
        beforeSelfClosing: "always",
        afterOpening: "never",
        beforeClosing: "never"
      }
    ]
  },
  overrides: [
    {
      files: ["*.d.ts", "*.ts", "*.tsx"],
      rules: {
        '@typescript-eslint/array-type': ['error', { default: 'array-simple'}],
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { prefer: 'type-imports', disallowTypeAnnotations: true }
        ],
        '@typescript-eslint/member-delimiter-style': 'error',
        '@typescript-eslint/method-signature-style': ['error', 'property'],
        '@typescript-eslint/no-confusing-non-null-assertion': 'warn',
        '@typescript-eslint/no-implicit-any-catch': 'error',
        '@typescript-eslint/no-require-imports': 'error'
      }
    },
    {
      files: ["*.tsx"],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off'
      }
    }
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    es2020: true,
    node: true
  }
};
