<template>
	<div>
		<ClientOnly>
			<div v-if="$vuetify.display.smAndDown">
				<PageHeader 
					v-if="headerImages.about.src.length" 
					:headerImg="headerImages.about.src">
				</PageHeader>

				<SectionHeader text="About"></SectionHeader>
		
				<v-row 
					dense 
					no-gutters
				>
					<v-spacer></v-spacer>
					<v-col :cols="$vuetify.display.mdAndUp ? 7 : 'auto'">
						<v-card 
							elevation="0" 
							class="px-5"
						>
							<div v-html="aboutText">
							</div>
						</v-card>
					</v-col>
					<v-spacer></v-spacer>
				</v-row>
			</div>
		</ClientOnly>

		<ClientOnly v-if="!$vuetify.display.smAndDown">
			<div>
				<v-row 
					dense 
					no-gutters
				>
					<v-col>
						<SectionHeader text="About"></SectionHeader>
					</v-col>
				</v-row>
				<v-row 
					dense 
					no-gutters
				>
					<v-col cols="5">	
						<v-sheet
							class="overflow-hidden pt-10"
						>
							<v-lazy>
								<v-img 
									:src="headerImages.about"
								>
								</v-img>
							</v-lazy>
						</v-sheet>
					</v-col>
					<v-col 
						cols=""
						class="pa-5"
					>
						<v-card 
							elevation="0" 
							class="mx-auto mt-5 pl-7"
						>
							<div v-html="aboutText"></div>
						</v-card>
					</v-col>	
				</v-row>
			</div>
		</ClientOnly>
	</div>
</template>

<script>
import { mapState } from 'pinia';

export default {
	name: "AboutPage",

	computed: {
		...mapState(useMainStore, ["headerImages", "aboutText"]),

		pageHeaderImg() {
			return this.headerImages.about
		},
	},
}
</script>