<template>
	<div>
		<v-row dense no-gutters>
			<v-col cols="12">
				<ClientOnly>
					<v-carousel height="auto" v-model="selectIndex" hide-delimiters>
						<v-carousel-item
							v-for="image in images"
							:key="image.id"
							:src="image.src"
							:lazy-src="image?.base64"
							:alt="image?.alt"
							max-height="70vh"
							contain
						>
						</v-carousel-item>

						<template #prev>
							<v-btn icon="mdi-chevron-left" @click="navigate('prev')"></v-btn>
						</template>
						<template #next>
							<v-btn icon="mdi-chevron-right" @click="navigate('next')"></v-btn>
						</template>
					</v-carousel>
				</ClientOnly>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12">
				<ClientOnly>
					<v-card elevation="0" v-if="selectedImg">
						<v-card-title 
							v-if="selectedImg.title" 
							class="text-center"
						>
							{{ selectedImg.title }}
						</v-card-title>
						<v-card-subtitle 
						v-if="selectedImg.size"
							class="text-center"
						>
							{{ selectedImg.size }}
						</v-card-subtitle>
						<v-card-text 
							v-if="selectedImg.description"
							class="text-center"
						>
							{{ selectedImg.description }}
						</v-card-text>
						<v-card-text class="text-center">
							To inquire about available paintings, 
							please <nuxt-link to="/contact">contact me</nuxt-link>.
						</v-card-text>
					</v-card>
				</ClientOnly>
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
		selectIndex: 0
	}),

	mounted() {
		// Get selected image and id
		const selected = this.images.filter((image, index) => {
			if (image.id === this.$route.params.id) {
				this.selectIndex = index
				return image
			}
			return false
		})

		this.selectedImg = selected[0]
	},

	computed: {
		...mapState(useMainStore, ["images"]),
	},

	methods: {
		navigate(direction) {
			let nextImageId = this.images[0].id

			if (direction == "next") {
				nextImageId = this.images[this.selectIndex + 1] ? this.images[this.selectIndex + 1].id : nextImageId
			}
			
			if (direction == "prev") {
				nextImageId = this.images[this.selectIndex - 1] ? nextImageId = this.images[this.selectIndex - 1].id : this.images.at(-1).id   
			}

			this.$router.replace({ path: `/gallery/${nextImageId}` })
		},
	},
}
</script>