<template>
	<v-sheet
		height="auto"
		:max-height="$vuetify.display.smAndUp ? '40vh' : '30vh'"
		class="overflow-hidden"
	>
		<v-img 
			v-if="headerImg.length"
			:src="headerImg"
			cover
		>
			<template #sources>
				<source :srcset="srcSet">
			</template>

			<template #placeholder>
				<div class="d-flex align-center justify-center fill-height">
					<v-progress-circular
						color="grey-lighten-4"
						indeterminate
					></v-progress-circular>
				</div>
			</template>
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
		
		srcSet: {
			type: String,
			default: "",
		},
	},
}
</script>