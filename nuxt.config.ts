import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
	css: [
		"vuetify/lib/styles/main.sass",
		"@mdi/font/css/materialdesignicons.min.css",
	],
	build: {
		transpile: ["vuetify"],
	},

	vite: {
		define: {
			"process.env.DEBUG": false,
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
	],

	imports: {
		// autimports useStore()
		dirs: ["./stores/*"],
	},

	runtimeConfig: {
		public: {
			datoCmsToken: process.env.DATO_CMS_TOKEN,
		},
	},
});