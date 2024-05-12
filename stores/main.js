import { useGraphqlQuery } from '~~/composables/useGraphqlQuery.js'

export const useMainStore = defineStore('main', {
	state: () => ({
		logo: { src: "", sizes: "", webpSrcSet: "", srcSet: "", alt: "site-logo"},
		images: [],
		headerImages: {
			home: { src: "", sizes: "", webpSrcSet: "", srcSet: "", alt: "site-header-home", base64: "", aspectRatio: ""},
			about: { src: "", sizes: "", webpSrcSet: "", srcSet: "", alt: "site-header-about", base64: "", aspectRatio: ""},
			gallery: { src: "", sizes: "", webpSrcSet: "", srcSet: "", alt: "site-header-gallery", base64: "", aspectRatio: ""},
			contact: { src: "", sizes: "", webpSrcSet: "", srcSet: "", alt: "site-header-contact", base64: "",  aspectRatio: ""},
		},
		introText: "",
		aboutText: "",
	}),

	actions: {
		async setAllImages() {
			// Set all images and text used for each page
			const query = `
				query getAllContent {
					home {
						logo {
							responsiveImage {
								alt
								src
								sizes
								srcSet
								webpSrcSet
								aspectRatio
							}
						}
						bannerImage {
							responsiveImage(imgixParams: {fm: webp, auto: compress, maxH: 600, maxW: 600 }) {
									alt
									src
									sizes
									srcSet
									webpSrcSet
									base64
									aspectRatio
							}
						}
					}
					gallery {
						headerImage {
						responsiveImage(imgixParams: {fm: webp, auto: compress, maxH: 1000, maxW: 1000}) {
							alt
							src
							sizes
							srcSet
							webpSrcSet
							base64
							aspectRatio
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
							responsiveImage(imgixParams: {fm: webp, auto: compress, maxH: 1000, maxW: 1000}) {
								src
								sizes
								srcSet
								webpSrcSet
								base64
							}
						}	
					}
					about {
						headerImage {
							responsiveImage(imgixParams: {fm: webp, auto: compress }) {
								alt
								src
								srcSet
								webpSrcSet
								base64
								aspectRatio
							}
						}
						text
					}
					contact {
						headerImage {
							responsiveImage(imgixParams: {, fm: webp, auto: compress }) {
							alt	
							src
							srcSet
							webpSrcSet
							base64
							}
						}
					}								
				}
			`

			const { data: response } = await useGraphqlQuery({ query })
			
			if (response.value) {
				this.logo = {
					src: response.value?.home?.logo?.responsiveImage?.src,
					sizes: response.value?.home?.logo?.responsiveImage?.sizes,
					srcSet: response.value?.home?.logo.responsiveImage?.srcSet,
					webpSrcSet: response.value?.home?.logo.responsiveImage?.webpSrcSet,
					alt: response.value?.home?.logo?.responsiveImage?.alt,
				}

				this.headerImages.home = {
					src: response.value?.home?.bannerImage?.responsiveImage?.src,
					sizes: response.value?.home?.bannerImage?.responsiveImage?.sizes,
					srcSet: response.value?.home?.bannerImage?.responsiveImage?.srcSet,
					webpSrcSet: response.value?.home?.bannerImage?.responsiveImage?.webpSrcSet,
					alt: response.value?.home?.bannerImage?.responsiveImage?.alt,
					base64: response.value?.home?.bannerImage?.responsiveImage?.base64,
					aspectRatio: response.value?.home?.bannerImage?.responsiveImage?.aspectRatio,
				}

				this.headerImages.gallery = {
					src: response.value.gallery.headerImage.responsiveImage.src,
					sizes: response.value.gallery.headerImage.responsiveImage.sizes,
					srcSet: response.value.gallery.headerImage.responsiveImage.srcSet,
					webpSrcSet: response.value.gallery.headerImage.responsiveImage.webpSrcSet,
					alt: response.value.gallery.headerImage.responsiveImage?.alt,
					base64: response.value.gallery.headerImage.responsiveImage?.base64,
				}
				
				this.images = useSortImages(response.value.allImages)

				this.headerImages.about = {
					src: response.value?.about?.headerImage?.responsiveImage?.src,
					srcSet: response.value?.about?.headerImage?.responsiveImage?.srcSet,
					alt: response.value?.about?.headerImage?.responsiveImage?.alt,
					base64: response.value?.about?.headerImage?.responsiveImage?.base64,
				}

				this.aboutText = response.value?.about?.text

				this.headerImages.contact = {
					src: response.value?.contact?.headerImage?.responsiveImage?.src,
					srcSet: response.value?.contact?.headerImage?.responsiveImage?.srcSet,
					webpSrcSet: response.value?.contact?.headerImage?.responsiveImage?.webpSrcSet,
					srcSet: response.value?.contact?.headerImage?.responsiveImage?.srcSet,
					alt: response.value?.contact?.headerImage?.responsiveImage?.alt,
					base64: response.value?.contact?.headerImage?.responsiveImage?.base64,
				}
			}
		},
	},
})