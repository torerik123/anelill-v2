<template>
	<div>
		<v-app-bar 
			app 
			color="white" 
			elevate-on-scroll 
			fixed 
			:class="customClass"
		>
			<v-hover v-slot="{ hover }">
				<!-- TODO 				 -->
				<!-- <v-img class="" 
					:lazy-src="logo" 
					:src="logo" 
					max-height="100" 
					max-width="100" 
					contain
					:style="hover ? 'cursor: pointer;' : ''" 
					@click="$router.push('/')">
				</v-img> -->
			</v-hover>
<!-- 
			<v-spacer></v-spacer>
			<v-toolbar-title class="" v-if="$vuetify.display.smAndUp">
				<v-btn text tile @click="$router.push('/about')">
					About
				</v-btn>
			</v-toolbar-title>
			<v-toolbar-title class="" v-if="$vuetify.display.smAndUp">
				<v-btn text tile @click="$router.push('/gallery')">
					Gallery
				</v-btn>
			</v-toolbar-title>
			<v-toolbar-title class="" v-if="$vuetify.display.smAndUp">
				<v-btn text tile @click="$router.push('/contact')">
					Contact
				</v-btn>
			</v-toolbar-title>
			<v-app-bar-nav-icon v-if="$vuetify.display.xs" @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
		</v-app-bar>

		<!-- <v-navigation-drawer app v-model="drawer" temporary>
			<v-list>
				<v-list-item>
					<v-list-item-title>
						<v-hover v-slot="{ hover }">
							<v-img :style="hover ? 'cursor: pointer;' : ''" @click="$router.push('/')" class="mx-auto"
								:src="logo" max-height="100" max-width="100" contain>
							</v-img>
						</v-hover>
					</v-list-item-title>
				</v-list-item>

				<v-list-item @click="$router.push('/about')">
					<v-list-item-title class="v-btn">
						About
					</v-list-item-title>
				</v-list-item>
				<v-list-item @click="$router.push('/gallery')">
					<v-list-item-title class="v-btn">
						Gallery
					</v-list-item-title>
				</v-list-item>
				<v-list-item @click="$router.push('/contact')">
					<v-list-item-title class="v-btn">
						Contact
					</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer> -->
	</div>
</template>

<script>
import { useMainStore } from '@/stores/main'
import { mapState } from 'pinia'
export default {
	name: "TheHeader",

	data() {
		return {
			drawer: false,
		    // logo: this.$store.getters.logo,
		    logo: false,
		}
	},

	props: {
		customClass: {
			type: String,
			default: "",
		}
	},

	computed: {
		...mapState(useMainStore, ['doubleCount']),

		isHomePage() {
			const route = useRoute();
			return route.path === "/"
		},
	},
}
</script>

<style scoped>

/deep/ .v-toolbar__content {
	padding: 0px !important;
}
</style>