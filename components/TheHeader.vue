<template>
	<div>
		<v-navigation-drawer app v-model="drawer" temporary>
			<v-list nav>
				<v-list-item>
					<v-list-item-title>
						<v-hover v-slot="{ hover }">
							<v-img 
								:style="hover ? 'cursor: pointer;' : ''" 
								@click="$router.push('/')" 
								class="mx-auto"
								:src="logo.src"
								:sizes="logo.sizes" 
								max-height="100" 
								max-width="100" 
								contain
								:alt="logo.alt"
							>
								<template #sources>
									<source :srcset="logo.srcSet">
								</template>
							</v-img>
						</v-hover>
					</v-list-item-title>
				</v-list-item>

				<v-list-item @click="$router.push('/about')">
					<v-list-item-title style="text-align: center;" class="text-uppercase">
						About
					</v-list-item-title>
				</v-list-item>
				<v-list-item @click="$router.push('/gallery')">
					<v-list-item-title style="text-align: center;" class="text-uppercase">
						Gallery
					</v-list-item-title>
				</v-list-item>
				<v-list-item @click="$router.push('/contact')">
					<v-list-item-title style="text-align: center;" class="text-uppercase">
						Contact
					</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar
			app 
			color="white" 
			scroll-behavior="elevate" 
			fixed 
			width="100%"
		>
		
			<v-hover>
				<template #default="{ isHovering, props }">
					<v-img
						:class="$vuetify.display.smAndDown ? 'ml-5' : 'ml-15'"
						v-bind="props"
						:src="logo.src" 
						:sizes="logo.sizes" 
						max-height="100" 
						max-width="100" 
						contain
						:style="isHovering ? 'cursor: pointer;' : ''" 
						@click="$router.push('/')"
						:alt="logo.alt"
					>
						<template #sources>
							<source :srcset="logo.srcSet">
						</template>
					</v-img>
				</template>
			</v-hover>		
			
			<v-spacer></v-spacer>

			<ClientOnly fallback-tag="span">
				<v-btn 
					v-if="$vuetify.display.smAndUp" 
					variant="text" 
					tile 
					@click="$router.push('/about')">
					About
				</v-btn>
			</ClientOnly>
			
			<ClientOnly fallback-tag="span">
				<v-btn v-if="$vuetify.display.smAndUp" variant="text" tile @click="$router.push('/gallery')">
					Gallery
				</v-btn>
			</ClientOnly>

			<ClientOnly fallback-tag="span">
				<v-btn 
					v-if="$vuetify.display.smAndUp" 
					variant="text" 
					tile 
					@click="$router.push('/contact')"
					:class="$vuetify.display.smAndDown ? 'mr-5' : 'mr-15'"
				>
					Contact
				</v-btn>	
			</ClientOnly>

			<ClientOnly fallback-tag="span">
				<v-app-bar-nav-icon 
					v-if="$vuetify.display.xs"  
					@click.stop="drawer = !drawer"
					class="mx-0 mr-2"
				></v-app-bar-nav-icon>
			</ClientOnly>

		</v-app-bar>
	</div>
</template>

<script>
import { mapState } from 'pinia';

export default {
	name: "TheHeader",

	props: {
		customClass: {
			type: String,
			default: "",
		}
	},

	data:() => ({
		drawer: false,
	}),

	computed: {
		...mapState(useMainStore, ["logo"]),

		isHomePage() {
			const route = useRoute();
			return route.path === "/"
		},
	},
}
</script>