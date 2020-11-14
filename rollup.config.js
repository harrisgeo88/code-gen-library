import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import shebang from 'rollup-plugin-preserve-shebang'

import pkg from './package.json'

const production = !process.env.ROLLUP_WATCH

const plugins = [
  shebang(),
  resolve(),
  babel({
    exclude: 'node_modules/**',
  }),
  production && terser(),
]

const configs = [
  {
    input: 'plopfile.js',
    external: ['plop'],
    output: [
      {
        file: pkg.main,
        globals: {
          plop: 'plop',
        },
        format: 'umd',
      },
    ],
    plugins
  },
  {
    input: 'logo.js',
    output: [
      {
        file: './build/logo.js',
        format: 'umd',
      },
    ],
    plugins
  },
]

export default configs