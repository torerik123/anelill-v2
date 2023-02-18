<template>
	<v-sheet
		:height="$vuetify.display.smAndUp ? '40vh' : '30vh'"
		class="overflow-hidden"
	>
		<v-img 
			:src="headerImg"
		>
		</v-img>
	</v-sheet>
</template>

<script>
export default {
	name: "PageHeader",

	props: {
		headerImg: {
			type: String,
			default: "",
		},
	},
}
</script>