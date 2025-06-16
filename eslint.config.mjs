import { reactConfig } from '@unicommerce/eslint-config/react'

/** @type {import("eslint").Linter.Config} */
export default [
  ...reactConfig,
  {
    rules: {
      'react/display-name': 'off'
    }
  }
]
