<template>
	<div>
		<v-row dense no-gutters>
			<v-col cols="12">
				<v-carousel height="auto" v-model="selectedImg" hide-delimiters>
						<v-carousel-item
							v-for="image in images"
							:key="image.id"
							:lazy-src="image.src"
							:src="image.src"
							max-height="70vh"
							contain
						>
						</v-carousel-item>
			</v-carousel>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12">
				<v-card elevation="0">
					<v-card-title class="text-center">{{ images[selectedImg].title }}</v-card-title>
					<v-card-subtitle class="text-center">{{ images[selectedImg].size }}</v-card-subtitle>
					<v-card-text class="text-center">
						{{ images[selectedImg].description }}
					</v-card-text>
					<v-card-text class="text-center">
						To inquire about available paintings, 
						please <nuxt-link to="/contact">contact me</nuxt-link>.
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<v-row dense no-gutters class="mt-10">
			<v-spacer></v-spacer>
			<v-col cols="auto" class="">
				<v-btn 
					color="primary" 
					nuxt 
					to="/gallery"
					large
				>
					Back to gallery
				</v-btn>
			</v-col>
			<v-spacer></v-spacer>
		</v-row>
	</div>
</template>

<script>
import { mapState } from 'pinia'

export default {
	name: "ImageCarousel",

	data:() => ({
		selectedImg: false,
	}),

	async created() {
		const { setGalleryImages } = useMainStore()
		setGalleryImages()
	},

	mounted() {
		const selected = this.images.filter(image => image.id === this.$route.params.id)
		this.selectedImg = selected.length ? selected.order : 0
		console.log(selected)
	},

	computed: {
		...mapState(useMainStore, ["images"]),
	},
}
</script>