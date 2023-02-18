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

	computed: {
		...mapState(useMainStore, ["headerImages"]),
	},
}
</script>