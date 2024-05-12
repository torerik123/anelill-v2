<template>
	<div>
		<ClientOnly>
			<PageHeader 
				v-if="headerImages.gallery.src.length" 
				:headerImg="headerImages.gallery"
			></PageHeader>
		</ClientOnly>
		<SectionHeader text="Gallery"></SectionHeader>
		<ImageGallery></ImageGallery>	
	</div>
</template>

<script>
import { mapState } from 'pinia';
export default {
	name: "GalleryPage",
	
	computed: {
		...mapState(useMainStore, ["headerImages"])
	},
}
</script>