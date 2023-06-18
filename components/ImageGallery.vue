<template>
	
		<v-sheet id="gallery" height="auto" class="">
			<v-row dense no-gutters class="justify-space-around">
				<ClientOnly>
					<v-col
						v-for="image in images"
						:key="image.id"
						:cols="cols"
					>
						<v-lazy 
							:options="{'threshold':0.5}"
							transition="fade-transition"
						>
							<ImageSingle 
								:image="image"
								@open="handleOpen"
								@viewImg="handleOpen" 
							></ImageSingle>
						</v-lazy>
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

	methods: {
		async handleOpen(id) {
			await navigateTo("/gallery/" + id)
		},
	},

	computed: {
		...mapState(useMainStore, ["images"]),

		cols() {
			switch(true) {
				case this.$vuetify.display.xs: return 12
				case this.$vuetify.display.sm: return 6
				case this.$vuetify.display.md: return 4
				default: return 3
			}
		},
	},

}
</script>