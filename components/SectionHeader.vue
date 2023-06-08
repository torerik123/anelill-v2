<template>
	<v-lazy
        v-model="isActive"
        :options="{
          threshold: .5
        }"
        transition="fade-transition"
    >
		<v-sheet id="about" height="auto">
			<v-row dense no-gutters>
				<v-col cols="12" class="text-center">
					<h2 class="py-10">{{ text }}</h2>
				</v-col>
			</v-row>
		</v-sheet>
	</v-lazy>
</template>

<script>
export default {
	name: "SectionHeader",

	data() {
		return {
			isActive: false,
			text: ""
		}
	},

	created() {
		// get all section headers
		const query = `{
			home {
				tagline
			}
		}
		`
		const { data: response } = useGraphqlQuery({ query })
		
		if (response.value) {
			this.text = response.value.home.tagline
		}
	}
}
</script>