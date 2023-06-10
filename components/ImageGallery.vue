<template>
	
		<v-sheet id="gallery" height="auto" class="">
			<v-row dense no-gutters class="justify-space-between">
				<ClientOnly>
					<v-col
						v-for="image in images"
						:key="image.id"
						cols="auto"
					>
						<ImageSingle 
							:image="image"
							@open="handleOpen"
							@viewImg="handleOpen" 
						></ImageSingle>
					</v-col>
				</ClientOnly>
				
			</v-row>
		</v-sheet>
</template>

<script>
export default {
	name: "ImageGallery",

	data() {
		return {
			isActive: false,
			dialog: false,
			index: 0,
			images: [],
		}
	},

	async created() {
		const query = `
			query galleryImages {
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
				const sortedImages = []

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
					sortedImages.push(image)
				})

				sortedImages.sort((a, b) => {
					return a.order - b.order
				})

				this.images = sortedImages
			}
	},

	methods: {
		handleOpen(index) {
			// TODO => navigateTo
			this.$router.push("/gallery/" + index)
		},
	},

}
</script>