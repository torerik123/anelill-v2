<template>
	<div>
		<PageHeader :headerImg="headerImages.gallery"></PageHeader>
		<SectionHeader text="Gallery"></SectionHeader>
		<ImageGallery></ImageGallery>	
	</div>
</template>

<script>
import { mapState } from 'pinia';
import { useMainStore } from '~~/stores/main';
export default {
	name: "Gallery",

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
				gallery {
					headerImage {
					responsiveImage(imgixParams: {auto: format}) {
						src
					}
					}
				}
			}`

	},

	computed: {
		...mapState(useMainStore, ["headerImages"]),
	},
}
</script>