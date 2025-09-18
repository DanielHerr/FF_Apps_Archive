import { defineConfig } from 'astro/config'

import netlify from '@astrojs/netlify'

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
	integrations: [ sitemap() ],
  site: "https://ffapps.danielherr.software",
	compressHTML: false,
	build: {
		inlineStylesheets: "never",
		concurrency: 1
	}
})