<template>
	<div>
		<!-- Hero image -->
		<HeroSection :image="heroImg"></HeroSection>

		<!-- About  -->
		<SectionHeader :text="introText"></SectionHeader>
		
		<!-- Gallery  -->
		<ImageGallery></ImageGallery>

		<!-- Contact -->
		<ContactForm class="mb-10"></ContactForm>
	</div>
</template>

<script>
import { useMainStore } from '@/stores/main'
import { mapState } from 'pinia'

export default {
	name: "Index",

	computed: {
		...mapState(useMainStore, ['headerImages', 'introText']),

		heroImg() {
			return this.headerImages.home; 
		},
	},
}
</script>

<style>
</style>