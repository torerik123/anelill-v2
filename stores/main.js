import { useGraphqlQuery } from '~~/composables/useGraphqlQuery.js'

export const useMainStore = defineStore('main', {
	state: () => ({
		logo: { src: "", sizes: "", srcSet: ""},
		images: [],
		headerImages: {
			home: { src: "", sizes: "", srcSet: ""},
			about: { src: "", sizes: "", srcSet: ""},
			gallery: { src: "", sizes: "", srcSet: ""},
			contact: { src: "", sizes: "", srcSet: ""},
		},
		introText: "",
		aboutText: "",
	}),

	actions: {
		async setAllImages() {
			// Set all images and text used for each page
			this.setHeaderContent()
			this.setMainPageContent()
			this.setGalleryContent()
			this.setAboutContent()
			this.setContactContent()			
		},

		async setHeaderContent() {
			const query = `query logo {
				home {
					logo {
						responsiveImage(imgixParams: {auto: format}) {
							src
							sizes
							webpSrcSet
						}
					}
				}
			}`
	
			const { data: response } = await useGraphqlQuery({ query })
			
			if (response.value) {
				this.logo.src = response.value.home.logo.responsiveImage.src
				this.logo.sizes =  response.value.home.logo.responsiveImage.sizes
				this.logo.srcSet =  response.value.home.logo.responsiveImage.webpSrcSet
			}
		},

		async setMainPageContent() {
			const query = `
				query getHeaderImg {
						home {
							logo {
								responsiveImage(imgixParams: {auto: format}) {
									src
									sizes
									webpSrcSet
								}
							}
							tagline
							bannerImage {
							responsiveImage(imgixParams: {auto: compress, maxH: 1000, maxW: 1000 }) {
									src
									sizes
									webpSrcSet
								}
							}
						}
					}`

			const { data:response } = await useGraphqlQuery({ query });

			if (response.value) {
				this.headerImages.home.src = response.value.home.bannerImage.responsiveImage.src
				this.headerImages.home.sizes = response.value.home.bannerImage.responsiveImage.sizes
				this.headerImages.home.srcSet = response.value.home.bannerImage.responsiveImage.webpSrcSet
			}
		},

		async setGalleryContent() {
				const query = `
					query galleryImages {
						gallery {
							headerImage {
							responsiveImage(imgixParams: {auto: compress, maxH: 1000, maxW: 1000}) {
								src
								sizes
								webpSrcSet
								}
							}
						}
						allImages {
							id
							size
							sold
							title
							description
							order
							image {
								id
								responsiveImage(imgixParams: {auto: compress, maxH: 1000, maxW: 1000}) {
									src
									sizes
									webpSrcSet
								}
							}	
						}
					}`
	
				const { data: response } = await useGraphqlQuery({ query })
	
				if (response.value) {
					this.headerImages.gallery.src = response.value.gallery.headerImage.responsiveImage.src
					this.headerImages.gallery.sizes = response.value.gallery.headerImage.responsiveImage.sizes
					this.headerImages.gallery.srcSet = response.value.gallery.headerImage.responsiveImage.webpSrcSet
					this.images = useSortImages(response.value.allImages)
				}
		},

		async setAboutContent() {
			const query = `
				query headerImage {
					about {
						headerImage {
							responsiveImage(imgixParams: {auto: format}) {
							src
							webpSrcSet
							}
						}
						text
					}
				}`

			const { data: response } = await useGraphqlQuery({ query })

			if (response.value) {
				this.headerImages.about.src = response.value.about.headerImage.responsiveImage.src
				this.headerImages.about.srcSet = response.value.about.headerImage.responsiveImage.webpSrcSet
				this.aboutText = response.value.about.text
			}
		},

		async setContactContent() {
			const query = `
				query headerImg {
					contact {
						headerImage {
							responsiveImage(imgixParams: {auto: format}) {
							src
							webpSrcSet
							}
						}
					}
				}
			`

			const { data: response } = useGraphqlQuery({ query })

			if (response.value) {
				this.headerImages.contact.src = response.value.contact.headerImage.responsiveImage.src
				this.headerImages.contact.srcSet = response.value.contact.headerImage.responsiveImage.webpSrcSet
			}
		},
	},
})