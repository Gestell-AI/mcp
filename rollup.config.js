import dts from 'rollup-plugin-dts'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default [
  {
    input: 'server/library.ts',
    external: [
      '@gestell/sdk',
      '@modelcontextprotocol/sdk',
      'dotenv',
      'fastify',
      'pino-pretty',
      'zod'
    ],
    plugins: [
      resolve({
        extensions: ['.ts', '.js'],
        // Setup path resolution for JS files
        moduleDirectories: ['node_modules'],
        preferBuiltins: true
      }),
      commonjs(),
      json(),
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: false, // we'll emit declarations in the second step
        moduleResolution: 'node',
        rootDir: '.',
        baseUrl: '.',
        paths: {
          '@server/*': ['server/*'],
          '@client/*': ['client/*'],
          '@tool/*': ['tool/*'],
          '@resource/*': ['resource/*'],
          '@workflow/*': ['workflow/*']
        }
      })
    ],
    output: [
      {
        file: 'dist/library.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/library.cjs.js',
        format: 'cjs',
        sourcemap: true
      }
    ]
  },
  {
    input: 'server/library.ts',
    external: [
      '@gestell/sdk',
      '@modelcontextprotocol/sdk',
      'dotenv',
      'fastify',
      'pino-pretty',
      'zod'
    ],
    plugins: [
      // Add path resolution for .d.ts files
      dts({
        compilerOptions: {
          baseUrl: '.',
          paths: {
            '@server/*': ['server/*'],
            '@client/*': ['client/*'],
            '@tool/*': ['tool/*'],
            '@resource/*': ['resource/*'],
            '@workflow/*': ['workflow/*']
          },
          preserveSymlinks: true
        },
        respectExternal: true,
        tsconfig: './tsconfig.build.json'
      })
    ],
    output: {
      file: 'dist/library.d.ts',
      format: 'es'
    }
  }
]
