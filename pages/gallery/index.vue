<template>
	<div>
		<ClientOnly>
			<PageHeader v-if="headerImg" :headerImg="headerImg"></PageHeader>
		</ClientOnly>
		<SectionHeader text="Gallery"></SectionHeader>
		<ImageGallery></ImageGallery>	
	</div>
</template>

<script>
export default {
	name: "Gallery",

	data:() => ({
		headerImg: false,
	}),

	async created() {
		const query = `
			query headerImage {
				gallery {
					headerImage {
					responsiveImage(imgixParams: {auto: format}) {
						src
					}
					}
				}
			}`

		const { data: response } = await useGraphqlQuery({ query })

		if (response.value) {
			this.headerImg = response.value.gallery.headerImage.responsiveImage.src
		}
	},
}
</script>