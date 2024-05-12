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
					<v-img
						v-bind="props"
						:style="isHovering ? 'cursor: pointer;' : ''" 
						@click="viewImg"
						class=""
						:src="image.src"
						:sizes="image.sizes"
						:alt="image?.alt"
						:lazy-src="image?.base64"	
						max-width="300"
						height="auto"
						contain
					>
					<template #sources>
						<source :srcset="image.srcSet">
					</template>
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
export default {
	name: "ImageSingle",
	emits: ["viewImg"],

	props: {
		image: {
			type: Object,
			default: () => ({}),
		},
	},

	data:() => ({
		scrollDown: null,
	}),

	methods: {
		viewImg() {
			this.$emit("viewImg", this.image.id)
		},
	}
}
</script>