import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import shebang from 'rollup-plugin-preserve-shebang'

import pkg from './package.json'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'plopfile.js',
  external: ['plop'],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
    {
      name: 'generate',
      file: `bin/bundle.js`,
      globals: {
        plop: 'plop',
      },
      format: 'umd',
    },
  ],
  plugins: [
    shebang(),
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
    production && terser(),
  ],
}
