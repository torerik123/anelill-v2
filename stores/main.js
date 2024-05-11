import { useGraphqlQuery } from '~~/composables/useGraphqlQuery.js'

export const useMainStore = defineStore('main', {
	state: () => ({
		logo: { src: "", sizes: "", srcSet: "", alt: "site-logo"},
		images: [],
		headerImages: {
			home: { src: "", sizes: "", srcSet: "", alt: "site-header-home"},
			about: { src: "", sizes: "", srcSet: "", alt: "site-header-about"},
			gallery: { src: "", sizes: "", srcSet: "", alt: "site-header-gallery" },
			contact: { src: "", sizes: "", srcSet: "", alt: "site-header-contact" },
		},
		introText: "",
		aboutText: "",
	}),

	actions: {
		setAllImages() {
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
							alt
							src
							sizes
							webpSrcSet
						}
					}
				}
			}`
	
			const { data: response } = await useGraphqlQuery({ query })
			
			if (response.value) {
				this.logo.src = response.value?.home?.logo?.responsiveImage?.src
				this.logo.sizes =  response.value?.home?.logo?.responsiveImage?.sizes
				this.logo.srcSet =  response.value?.home?.logo.responsiveImage?.webpSrcSet
				this.logo.alt =  response.value?.home?.logo?.responsiveImage?.alt
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
									alt
									src
									sizes
									webpSrcSet
								}
							}
						}
					}`

			const { data:response } = await useGraphqlQuery({ query });

			if (response.value) {
				this.headerImages.home.src = response.value?.home?.bannerImage?.responsiveImage?.src
				this.headerImages.home.sizes = response.value?.home?.bannerImage?.responsiveImage?.sizes
				this.headerImages.home.srcSet = response.value?.home?.bannerImage?.responsiveImage?.webpSrcSet
				this.headerImages.home.alt = response.value?.home?.bannerImage?.responsiveImage?.alt
			}
		},

		async setGalleryContent() {
			const query = `
				query galleryImages {
					gallery {
						headerImage {
						responsiveImage(imgixParams: {auto: compress, maxH: 1000, maxW: 1000}) {
							alt
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
							alt
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
					this.headerImages.gallery.alt = response.value.gallery.headerImage.responsiveImage?.alt
					this.images = useSortImages(response.value.allImages)
				}
		},

		async setAboutContent() {
			const query = `
				query headerImage {
					about {
						headerImage {
							responsiveImage(imgixParams: {auto: format}) {
							alt
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
				this.headerImages.about.alt = response.value.about.headerImage.responsiveImage.alt
				this.aboutText = response.value.about.text
			}
		},

		async setContactContent() {
			const query = `
				query headerImg {
					contact {
						headerImage {
							responsiveImage(imgixParams: {auto: format}) {
							alt	
							src
							webpSrcSet
							}
						}
					}
				}
			`

			const { data: response } = useGraphqlQuery({ query })

			if (response.value) {
				this.headerImages.contact.src = response.value?.contact?.headerImage?.responsiveImage?.src
				this.headerImages.contact.srcSet = response.value?.contact?.headerImage?.responsiveImage?.webpSrcSet
				this.headerImages.contact.alt = response.value?.contact?.headerImage?.responsiveImage?.alt
			}
		},
	},
})