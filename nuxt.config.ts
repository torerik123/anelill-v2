export default defineNuxtConfig({
	css: ['vuetify/lib/styles/main.sass',  '@mdi/font/css/materialdesignicons.min.css',],
	build: {
	  transpile: ['vuetify'],
	},

	vite: {
	  define: {
		'process.env.DEBUG': false,
	  },
	},
	modules: [
		// ...
		[
		  '@pinia/nuxt',
		  {
			autoImports: [
			  'defineStore',
			],
		  },
		],
	  ],
	runtimeConfig: {
		public: {
			datoCmsToken: process.env.DATO_CMS_TOKEN,
		}
	}
  })