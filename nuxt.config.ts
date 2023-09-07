import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
	// Workaround for google font download on build 
	experimental: {
		inlineSSRStyles: id => !id?.includes('entry')
	},

	css: [
		"vuetify/lib/styles/main.sass",
		"@mdi/font/css/materialdesignicons.min.css",
		"@/main.scss"
	],
	build: {
		transpile: ["vuetify"],
	},

	vite: {
		define: {
			"process.env.DEBUG": false,
		},
		plugins: [
			vuetify({
				autoImport: true,
				styles: {
					configFile: "./settings.scss",
				},
			}),
		],
	},

	modules: [
		[
			"@pinia/nuxt",
			{
				autoImports: ["defineStore"],
			},
		],
		async (options, nuxt) => {
			nuxt.hooks.hook("vite:extendConfig", (config) =>
				config.plugins.push(vuetify())
			);
		},
		[
			"@nuxtjs/google-fonts",
			{
				families: {
					"Sono": [400],
					download: true,
					inject: true,
				},
			},
		],
	],

	datocms: {
		datocmsReadOnlyToken: process.env.DATO_CMS_TOKEN,
	},

	runtimeConfig: {
		public: {
			datoCmsToken: process.env.DATO_CMS_TOKEN,
		},
	},

	imports: {
		// autimports useStore()
		dirs: ["./stores/*"],
	},
});