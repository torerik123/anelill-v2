import { createVuetify } from 'vuetify'
import 'vuetify/styles'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
	ssr: true,
	theme: {
		defaultTheme: 'light'
	  }
  })

  nuxtApp.vueApp.use(vuetify)
})