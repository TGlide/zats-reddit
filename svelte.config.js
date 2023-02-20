import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$styles: './src/styles',
			$components: './src/components',
			$stores: './src/stores',
			$helpers: './src/helpers',
			$UI: './src/UI'
		}
	}
};

export default config;
