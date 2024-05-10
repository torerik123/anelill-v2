import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
	devtools: {
		enabled: true,

		timeline: {
			enabled: true,
		},
	},

	// Workaround for google font download on build
	experimental: {
		inlineSSRStyles: (id) => !id?.includes("entry"),
	},

	css: [
		"vuetify/lib/styles/main.sass",
		"@mdi/font/css/materialdesignicons.min.css",
		"@/styles/main.scss",
	],
	build: {
		transpile: ["vuetify"],
	},

	vite: {
		define: {
			"process.env.DEBUG": false,
		},
		vue: {
			template: {
				transformAssetUrls,
			},
		},
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
					Sono: [400],
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
