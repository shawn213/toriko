import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
	resolve: {
    alias: {
      $page: path.resolve('./src/pages')
    }
  },
	base: '/toriko/',
	build: {
		target:['edge90','chrome90','firefox90','safari15'],
	}
})
