import { useGraphqlQuery } from '~~/composables/useGraphqlQuery.js'

export const useMainStore = defineStore('main', {
	state: () => ({
		logo: "",
		images: [],
		headerImages: {
			home: "",
			about: '',
			gallery: "",
			contact: '',
		},
		introText: "",
		aboutText: "",
	}),

	actions: {
		async setGalleryImages() {
			if (!this.images.length) {
				const query = `
					query galleryImages {
						gallery {
							headerImage {
							responsiveImage(imgixParams: {auto: format}) {
								src
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
								responsiveImage(imgixParams: {auto: format}) {
									src
								}
							}	
						}
					}`
	
				const { data: response } = await useGraphqlQuery({ query })
	
				if (response.value) {
					this.headerImages.gallery = response.value.gallery.headerImage.responsiveImage.src
					this.images = useSortImages(response.value.allImages)
				}
			}
		},
	},
})