import { useGraphqlQuery } from '~~/composables/useGraphqlQuery.js'
import { skipHydrate } from 'pinia'

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

	// async hydrate(state, initialState) {
	// 	const getContent = `
	// 			query MyQuery {
	// 				allImages {
	// 					id
	// 					size
	// 					sold
	// 					title
	// 					description
	// 					order
	// 					image {
	// 						id
	// 						responsiveImage(imgixParams: {auto: format}) {
	// 							src
	// 						}
	// 					}	
	// 				}
	// 				home {
	// 					logo {
	// 						responsiveImage(imgixParams: {auto: enhance}) {
	// 							src
	// 						}
	// 					}
	// 					tagline
	// 					bannerImage {
	// 					responsiveImage(imgixParams: {auto: format}) {
	// 							src
	// 						}
	// 					}
	// 				}
	// 				about {
	// 					headerImage {
	// 					responsiveImage(imgixParams: {auto: format}) {
	// 						src
	// 					}
	// 					}
	// 					text
	// 				}
	// 				gallery {
	// 					headerImage {
	// 					responsiveImage(imgixParams: {auto: format}) {
	// 						src
	// 					}
	// 					}
	// 				}
	// 				contact {
	// 					headerImage {
	// 						responsiveImage(imgixParams: {auto: format}) {
	// 							src
	// 						}
	// 					}
	// 				}
	// 			}
	// 		`

	// 		const { data:response } = await useGraphqlQuery({ query: getContent });
				
	// 		let images = []

	// 		// Header images
	// 		const headerImages = {
	// 			home: response.value.home.bannerImage.responsiveImage.src,
	// 			about: response.value.about.headerImage.responsiveImage.src,
	// 			gallery: response.value.gallery.headerImage.responsiveImage.src,
	// 			contact: response.value.contact.headerImage.responsiveImage.src
	// 		}

	// 		const logo = response.value.home.logo.responsiveImage.src
	// 		const tagline = response.value.home.tagline
	// 		const aboutText = response.value.about.text

	// 		// Gallery images
	// 		Object.values(response.value.allImages).forEach((item) => {
	// 			const image = {
	// 				id: item.id,
	// 				order: item.order,
	// 				title: item.title,
	// 				src: item.image.responsiveImage.src,
	// 				size: item.size,
	// 				sold: item.sold,
	// 				description: item.description,
	// 			}
	// 			images.push(image)
	// 		})

	// 		images.sort((a, b) => {
	// 			return a.order - b.order
	// 		})

	// 		state.logo = logo
	// 		state.introText = tagline
	// 		state.aboutText = aboutText
	// 		state.headerImages = headerImages
	// 		state.images = images
	//   },
	
	actions: {
		async setGalleryImages() {
			const getContent = `
				query MyQuery {
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
					home {
						logo {
							responsiveImage(imgixParams: {auto: enhance}) {
								src
							}
						}
						tagline
						bannerImage {
						responsiveImage(imgixParams: {auto: format}) {
								src
							}
						}
					}
					about {
						headerImage {
						responsiveImage(imgixParams: {auto: format}) {
							src
						}
						}
						text
					}
					gallery {
						headerImage {
						responsiveImage(imgixParams: {auto: format}) {
							src
						}
						}
					}
					contact {
						headerImage {
							responsiveImage(imgixParams: {auto: format}) {
								src
							}
						}
					}
				}
			`

			const { data:response } = await useGraphqlQuery({ query: getContent });
				
			let images = []

			// Header images
			const headerImages = {
				home: response.value.home.bannerImage.responsiveImage.src,
				about: response.value.about.headerImage.responsiveImage.src,
				gallery: response.value.gallery.headerImage.responsiveImage.src,
				contact: response.value.contact.headerImage.responsiveImage.src
			}

			const logo = response.value.home.logo.responsiveImage.src
			const tagline = response.value.home.tagline
			const aboutText = response.value.about.text

			// Gallery images
			Object.values(response.value.allImages).forEach((item) => {
				const image = {
					id: item.id,
					order: item.order,
					title: item.title,
					src: item.image.responsiveImage.src,
					size: item.size,
					sold: item.sold,
					description: item.description,
				}
				images.push(image)
			})

			images.sort((a, b) => {
				return a.order - b.order
			})

			this.logo = logo
			this.introText = tagline
			this.aboutText = aboutText
			this.headerImages = headerImages
			this.images = images
		},
	},
})