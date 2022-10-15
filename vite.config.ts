import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { fileURLToPath, URL } from 'node:url'

import { presetAttributify, presetUno } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [
        presetAttributify({ /* preset options */}),
        presetUno(),
      ],
      rules: [
        ['my-test', { margin: '0.25rem', backgroundColor: 'red' }],
      ]
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
