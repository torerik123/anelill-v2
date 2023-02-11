<template>
	<v-lazy
		v-model="isActive"
		:options="{
		threshold: .5
		}"
		transition="fade-transition"
	>
		<v-sheet id="gallery" height="auto" class="">
			<v-row dense no-gutters class="justify-space-between">
				<v-col
					v-for="image in images"
					:key="image.src"
					:cols="$vuetify.display.mdAndUp ? '4' : '6'" 
					class=""
				>
					<ImageSingle 
						:image="image"
						@open="handleOpen"
						@viewImg="handleOpen" 
					></ImageSingle>
				</v-col>
			</v-row>
		</v-sheet>
	</v-lazy>
</template>

<script>
import { useMainStore } from '@/stores/main'
import { mapState } from 'pinia'

export default {
	name: "ImageGallery",

	data() {
		return {
			isActive: false,
			dialog: false,
			index: 0,
		}
	},

	computed: {
		...mapState(useMainStore, ['images']),

	},

	methods: {
		handleOpen(index) {
			this.$router.push("/gallery/" + index)
		},
	},

}
</script>