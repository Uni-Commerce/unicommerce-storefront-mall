import { nextConfig } from '@unicommerce/nextjs-config'

import pkg from './package.json'

const timestamp = new Date().getTime()

export default nextConfig({
  dirname: process.cwd(),
  pkg,
  timestamp,
  useMaterial: false,
  experimental: {
    esmExternals: true
  },
  transpilePackages: ['@unicommerce/hooks']
})
