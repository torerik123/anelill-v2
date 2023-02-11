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
				v-show="show"
			>
				<template v-slot:placeholder>
					<v-sheet color="gray" height="100%" width="100%"></v-sheet>
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
			show: false
		}
	},

	props: {
		image: {
			type: String,
			default: false,
		},
	},

	mounted() {
		this.show = true
	},
}
</script>