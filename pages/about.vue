<template>
	<div>
		<div v-if="$vuetify.display.smAndDown">
			<ClientOnly>
				<PageHeader v-if="headerImg.length" :headerImg="headerImg"></PageHeader>
			</ClientOnly>
			<SectionHeader text="About"></SectionHeader>
	
			<v-row dense no-gutters>
				<v-spacer></v-spacer>
				<v-col :cols="$vuetify.display.mdAndUp ? 7 : 'auto'">
					<v-card elevation="0" class="px-5">
						<div v-html="aboutText">
						</div>
					</v-card>
				</v-col>
				<v-spacer></v-spacer>
			</v-row>
		</div>

		<div v-else>
			<v-row dense no-gutters>
				<v-col>
						<SectionHeader text="About"></SectionHeader>
				</v-col>
			</v-row>
			<v-row dense no-gutters>
				<v-col cols="5">	
					<v-sheet
						class="overflow-hidden pt-10"
					>
						<v-img 
							:src="headerImg"
						>
						</v-img>
					</v-sheet>
				</v-col>
				<v-col cols="" class="pa-5">
					<v-card elevation="0" class="mx-auto mt-5 pl-7">
						<div v-html="aboutText"></div>
					</v-card>
				</v-col>	
			</v-row>
		</div>
	</div>
</template>

<script>
export default {
	name: "About",

	data:() => ({
		headerImg: "",
		aboutText: "",
	}),

	async created() {
		const query = `
			query headerImage {
				about {
					headerImage {
						responsiveImage(imgixParams: {auto: format}) {
						src
						}
					}
					text
				}
			}`

		const { data: response } = await useGraphqlQuery({ query })

		if (response.value) {
			this.headerImg = response.value.about.headerImage.responsiveImage.src
			this.aboutText = response.value.about.text
		}
	},
}
</script>