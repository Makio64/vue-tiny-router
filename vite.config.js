import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig( {
	plugins: [vue()],
	build: {
		lib: {
			entry: './src/index.js',
			name: 'VueTinyRouter',
			fileName: 'index'
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				exports: 'named',
				globals: {
					vue: 'Vue'
				}
			}
		}
	}
} ) 