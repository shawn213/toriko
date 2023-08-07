import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { fileURLToPath, URL } from 'url';

const dev = process.argv.includes('dev');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
	base: '/toriko/',
  resolve: {
    alias: [
      { find: '$lib', replacement: fileURLToPath(new URL('./src/lib', import.meta.url)) },
      { find: '$stores', replacement: fileURLToPath(new URL('./src/stores', import.meta.url)) },
      { find: '$utils', replacement: fileURLToPath(new URL('./src/utils', import.meta.url)) },
    ]
  },
	build: {
		target:['edge90','chrome90','firefox90','safari15'],
	}
})
