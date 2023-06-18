<template>
	<div>
		<ClientOnly>
			<PageHeader 
				v-if="headerImages.gallery.src.length" 
				:headerImg="headerImages.gallery.src"
				:srcSet="headerImages.gallery.srcSet"
			></PageHeader>
		</ClientOnly>
		<SectionHeader text="Gallery"></SectionHeader>
		<ImageGallery></ImageGallery>	
	</div>
</template>

<script>
import { mapState } from 'pinia';
export default {
	name: "Gallery",

	data:() => ({
		headerImg: false,
	}),

	computed: {
		...mapState(useMainStore, ["headerImages"])
	},
}
</script>