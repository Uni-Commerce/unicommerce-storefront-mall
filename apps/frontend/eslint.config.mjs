import { nextJsConfig } from '@unicommerce/eslint-config/next'

/** @type {import("eslint").Linter.Config} */
export default [
  ...nextJsConfig,
  {
    rules: {
      'no-useless-catch': 'off',
      'react/display-name': 'off'
    }
  }
]
