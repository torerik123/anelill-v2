<template>
	<v-card
		height="100%"
		elevation="0"
		:class="$vuetify.display.smAndDown ? 'px-2 pb-4': 'px-10 pb-12'"
	>
		<v-sheet 
			width="auto" 
			max-width="300" 
			class="ma-0 mx-auto"
		>
			<v-hover>
				<template v-slot:default="{ isHovering, props }">
					<!-- TODO v-lazy -->
					<!-- TODO Nuxt image -->
					<v-img
						v-bind="props"
						:style="isHovering ? 'cursor: pointer;' : ''" 
						@click="viewImg"
						class=""
						:src="image.src"	
						max-width="300"
						height="auto"
						contain
					>
					</v-img>
				</template>
			</v-hover>
			
			<v-row dense no-gutters>
				<v-col cols="auto" align-self=center>
					<v-card-title class="pl-0 pt-2 pb-0 pr-2" v-if="image.title">{{ image.title }}</v-card-title>
				</v-col>
				<v-col v-if="image.sold" align-self=center>
					<v-icon class="pt-2 pb-0" color="red" small>mdi-checkbox-blank-circle</v-icon>
				</v-col>
			</v-row>
		</v-sheet>
	</v-card>
</template>


<script>
import { mapState } from 'pinia'
import { useMainStore } from '~~/stores/main'

export default {
	name: "ImageSingle",
	emits: ["open"],

	props: {
		image: {
			type: Object,
			default: () => ({}),
		},
	},

	data:() => ({
		scrollDown: null,
	}),

	// computed: {
	// 	...mapState(useMainStore, ['images']),
	// },

	methods: {
		viewImg() {
			throw new Error("--TODO => viewImg")
			const index = this.images.indexOf(this.image)
			this.$emit("viewImg", index)
		},
	}
}
</script>