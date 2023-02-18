<template>
	<div>
		<div v-if="$vuetify.display.smAndDown">
			<PageHeader :headerImg="headerImages.about"></PageHeader>
			<SectionHeader text="About"></SectionHeader>
	
			<v-row dense no-gutters>
				<v-spacer></v-spacer>
				<v-col :cols="$vuetify.display.mdAndUp ? 7 : 'auto'">
					<v-card elevation="0" class="px-5">
						<div v-html="text">
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
							:src="headerImages.about"
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
import { useMainStore } from '~~/stores/main';
import { mapState } from 'pinia';
export default {
	name: "About",

	computed: {
		...mapState(useMainStore, ["headerImages", "aboutText"]),
	},
}
</script>