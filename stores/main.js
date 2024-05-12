import { useGraphqlQuery } from '~~/composables/useGraphqlQuery.js'

export const useMainStore = defineStore('main', {
	state: () => ({
		logo: { src: "", sizes: "", srcSet: "", alt: "site-logo"},
		images: [],
		headerImages: {
			home: { src: "", sizes: "", srcSet: "", alt: "site-header-home", base64: ""},
			about: { src: "", sizes: "", srcSet: "", alt: "site-header-about", base64: ""},
			gallery: { src: "", sizes: "", srcSet: "", alt: "site-header-gallery", base64: "" },
			contact: { src: "", sizes: "", srcSet: "", alt: "site-header-contact", base64: "" },
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
				this.logo = {
					src: response.value?.home?.logo?.responsiveImage?.src,
					sizes: response.value?.home?.logo?.responsiveImage?.sizes,
					srcSet: response.value?.home?.logo.responsiveImage?.webpSrcSet,
					alt: response.value?.home?.logo?.responsiveImage?.alt,
				}
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
									base64
								}
							}
							tagline
							bannerImage {
							responsiveImage(imgixParams: {auto: compress, maxH: 1000, maxW: 1000 }) {
									alt
									src
									sizes
									webpSrcSet
									base64
								}
							}
						}
					}`

			const { data:response } = await useGraphqlQuery({ query });

			if (response.value) {
				this.headerImages.home = {
					src: response.value?.home?.bannerImage?.responsiveImage?.src,
					sizes: response.value?.home?.bannerImage?.responsiveImage?.sizes,
					srcSet: response.value?.home?.bannerImage?.responsiveImage?.webpSrcSet,
					alt: response.value?.home?.bannerImage?.responsiveImage?.alt,
					base64: response.value?.home?.bannerImage?.responsiveImage?.base64,
				}
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
							base64
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
								base64
							}
						}	
					}
				}`

				const { data: response } = await useGraphqlQuery({ query })
	
				if (response.value) {
					this.headerImages.gallery = {
						src: response.value.gallery.headerImage.responsiveImage.src,
						sizes: response.value.gallery.headerImage.responsiveImage.sizes,
						srcSet: response.value.gallery.headerImage.responsiveImage.webpSrcSet,
						alt: response.value.gallery.headerImage.responsiveImage?.alt,
						base64: response.value.gallery.headerImage.responsiveImage?.base64,
					}
					
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
							srcSet
							base64
							}
						}
						text
					}
				}`

			const { data: response } = await useGraphqlQuery({ query })

			if (response.value) {
				this.headerImages.about = {
					src: response.value?.about?.headerImage?.responsiveImage?.src,
					srcSet: response.value?.about?.headerImage?.responsiveImage?.srcSet,
					alt: response.value?.about?.headerImage?.responsiveImage?.alt,
					base64: response.value?.about?.headerImage?.responsiveImage?.base64,
				}

				this.aboutText = response.value?.about?.text
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
							base64
							}
						}
					}
				}
			`

			const { data: response } = useGraphqlQuery({ query })

			if (response.value) {
				this.headerImages.contact = {
					src: response.value?.contact?.headerImage?.responsiveImage?.src,
					srcSet: response.value?.contact?.headerImage?.responsiveImage?.webpSrcSet,
					alt: response.value?.contact?.headerImage?.responsiveImage?.alt,
					base64: response.value?.contact?.headerImage?.responsiveImage?.base64,
				}
			}
		},
	},
})