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
				:src="headerImages.home.src"
				transition="slide-y-transition"
				cover
			>
				<template #sources>
					<source :srcset="headerImages.home.srcSet">
				</template>
				<template #placeholder>
					<div class="d-flex align-center justify-center fill-height fill-width">
						<v-progress-circular
							v-if="!headerImages.home.src.length"
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
import { mapState } from 'pinia';
export default {
	name: "HeroSection",

	data:() => ({
		isActive: false,
	}),

	computed: {
		...mapState(useMainStore, ["headerImages"])
	},
}
</script>