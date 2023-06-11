<template>
	
		<v-sheet id="gallery" height="auto" class="">
			<v-row dense no-gutters class="justify-space-around">
				<ClientOnly>
					<v-col
						v-for="image in images"
						:key="image.id"
						:cols="cols"
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
import { mapState } from 'pinia'
export default {
	name: "ImageGallery",

	data:() => ({
		isActive: false,
		dialog: false,
		index: 0,
	}),

	created() {
		const { setGalleryImages } = useMainStore()
		setGalleryImages()
	},

	methods: {
		async handleOpen(id) {
			await navigateTo("/gallery/" + id)
		},
	},

	computed: {
		...mapState(useMainStore, ["images"]),

		cols() {
			if (this.$vuetify.display.smAndDown) {
				return 6
			} else if (this.$vuetify.display.md) {
				return 4
			} else {
				return "auto"
			}
		},
	},

}
</script>