<template>
	<v-lazy
		v-model="isActive"
		:options="{
		threshold: .5
		}"
		transition="fade-transition"
	>
		<v-sheet class="pt-10 overflow-hidden" height="auto">
			<v-img
				width="100%"
				min-height="40vh"
				max-height="60vh"
				:src="image"
				transition="slide-y-transition"
				cover
			>
				<template #placeholder>
					<div class="d-flex align-center justify-center fill-height fill-width">
						<v-progress-circular
							v-if="!image.length"
							color="grey-lighten-4"
							indeterminate
						></v-progress-circular>
					</div>
				</template>
			</v-img>
		</v-sheet>
	</v-lazy>
</template>

<script>
export default {
	name: "HeroSection",

	data() {
		return {
			isActive: false,
			show: false,
			image: "",
		}
	},

	async created() {
		const query = `
			query getHeaderImg {
					home {
						logo {
							responsiveImage(imgixParams: {auto: enhance}) {
								src
							}
						}
						tagline
						bannerImage {
						responsiveImage(imgixParams: {auto: format}) {
								src
							}
						}
					}
				}`

		const { data:response } = await useGraphqlQuery({ query });

		if (response.value) {
			this.image = response.value.home.bannerImage.responsiveImage.src
		}
	},


	mounted() {
		this.show = true
	},
}
</script>