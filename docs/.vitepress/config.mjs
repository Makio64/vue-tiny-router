import { defineConfig } from 'vitepress'

export default defineConfig( {
	title: 'Vue Tiny Router',
	description: 'A lightweight Vue 3 router (~1.33 kB Brotli) with route params, guards, lazy loading, and redirects',
	base: '/',
  
	head: [
		['link', { rel: 'icon', href: '/favicon.ico' }],
		['meta', { name: 'theme-color', content: '#3498db' }],
		['meta', { name: 'og:type', content: 'website' }],
		['meta', { name: 'og:locale', content: 'en' }],
		['meta', { name: 'og:title', content: 'Vue Tiny Router | Lightweight Vue 3 Router' }],
		['meta', { name: 'og:description', content: 'A lightweight Vue 3 router (~1.33 kB Brotli) with route params, guards, lazy loading, and redirects' }],
		['meta', { name: 'og:site_name', content: 'Vue Tiny Router' }],
	],

	themeConfig: {
		logo: '🚀',
    
		nav: [
			{ text: 'Guide', link: '/guide/getting-started' },
			{ text: 'API', link: '/api/router' },
			{ text: 'Examples', link: '/examples/basic' },
			{ text: 'Migration', link: '/migration/from-vue-router' },
			{ 
				text: 'Links', 
				items: [
					{ text: 'GitHub', link: 'https://github.com/Makio64/vue-tiny-router' },
					{ text: 'NPM', link: 'https://www.npmjs.com/package/vue-tiny-router' },
					{ text: 'Live Example', link: 'https://stackblitz.com/github/Makio64/vue-tiny-router/tree/main/example' }
				]
			}
		],

		sidebar: {
			'/guide/': [
				{
					text: 'Introduction',
					items: [
						{ text: 'What is Vue Tiny Router?', link: '/guide/introduction' },
						{ text: 'Getting Started', link: '/guide/getting-started' },
					]
				},
				{
					text: 'Essentials',
					items: [
						{ text: 'Basic Routing', link: '/guide/basic-routing' },
						{ text: 'Route Parameters', link: '/guide/route-parameters' },
						{ text: 'Programmatic Navigation', link: '/guide/programmatic-navigation' },
						{ text: 'Route Guards', link: '/guide/route-guards' },
						{ text: 'Redirects', link: '/guide/redirects' }
					]
				},
				{
					text: 'Advanced',
					items: [
						{ text: 'Memory Mode', link: '/guide/memory-mode' },
						{ text: 'Anchor Links', link: '/guide/anchor-links' },
						{ text: 'Lazy Loading', link: '/guide/lazy-loading' },
						{ text: 'Query Strings', link: '/guide/query-strings' },
						{ text: 'Multiple Routers', link: '/guide/multiple-routers' },
						{ text: 'TypeScript', link: '/guide/typescript' },
						{ text: 'Testing', link: '/guide/testing' }
					]
				},
				{
					text: 'Resources',
					items: [{ text: 'Comparison', link: '/guide/comparison' }]
				}
			],
			'/api/': [
				{
					text: 'API Reference',
					items: [
						{ text: 'Router', link: '/api/router' },
						{ text: 'Component Props', link: '/api/component-props' },
						{ text: 'Global Properties', link: '/api/global-properties' },
						{ text: 'Exports', link: '/api/exports' }
					]
				}
			],
			'/examples/': [
				{
					text: 'Examples',
					items: [
						{ text: 'Basic Usage', link: '/examples/basic' },
						{ text: 'Route Parameters', link: '/examples/route-parameters' },
						{ text: 'Route Guards', link: '/examples/route-guards' },
						{ text: 'Memory Mode', link: '/examples/memory-mode' },
						{ text: 'Anchor Links', link: '/examples/anchor-links' },
						{ text: 'Full App Example', link: '/examples/full-app' }
					]
				}
			]
		},

		socialLinks: [{ icon: 'github', link: 'https://github.com/Makio64/vue-tiny-router' }],

		search: {
			provider: 'local'
		},

		footer: {
			message: 'Released under the MIT License.',
			copyright: 'Copyright © 2025 Makio64'
		}
	}
} ) 