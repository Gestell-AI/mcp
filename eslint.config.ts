import prettier from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'
import eslint from '@eslint/js'

export default tseslint.config(
  prettier,
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    languageOptions: {
      parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 'latest'
      }
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: false,
          trailingComma: 'none'
        }
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            [
              '^\\u0000',
              '^\\w[^{}]*$',
              '^@\\w[^{}]*$',
              '^\\w.*\\{.*\\}',
              '^@\\w.*\\{.*\\}',
              '^\\.'
            ]
          ]
        }
      ],
      'simple-import-sort/exports': 'warn'
    }
  },
  { ignores: ['node_modules'] }
)
