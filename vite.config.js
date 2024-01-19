// @ts-nocheck
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
	// plugins: [sveltekit(), mkcert()],
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	envDir: './',
	// server: {
	// 	https: true
	// }
});
