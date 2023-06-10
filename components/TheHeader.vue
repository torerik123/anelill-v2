<template>
	<div>
		<v-navigation-drawer app v-model="drawer" temporary>
			<v-list nav>
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
			:class="$vuetify.display.smAndDown ? 'pl-5 pr-2 ' : 'px-15'"
		>
			<v-hover>
				<template v-slot:default="{ isHovering, props }">
						<v-img
							v-bind="props"
							class="" 
							:srcset="srcSet" 
							:src="logo" 
							max-height="100" 
							max-width="100" 
							contain
							:style="isHovering ? 'cursor: pointer;' : ''" 
							@click="$router.push('/')">
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
				<v-btn v-if="$vuetify.display.smAndUp" variant="text" tile @click="$router.push('/contact')">
					Contact
				</v-btn>	
			</ClientOnly>

			<ClientOnly fallback-tag="span">
				<v-app-bar-nav-icon 
					v-if="$vuetify.display.xs"  
					@click.stop="drawer = !drawer"
					class="mx-0"
				></v-app-bar-nav-icon>
			</ClientOnly>

		</v-app-bar>
	</div>
</template>

<script>

export default {
	name: "TheHeader",

	data:() => ({
		drawer: false,
		logo: "",
		srcSet: "",
	}),

	async created() {
		const query = `query logo {
			home {
				logo {
					responsiveImage(imgixParams: {auto: enhance}) {
						src
						srcSet
					}
				}
			}
		}`

		const { data: response } = await useGraphqlQuery({ query })

		if (response.value) {
			this.logo = response.value.home.logo.responsiveImage.src
			this.srcSet =  response.value.home.logo.responsiveImage.srcSet
		}
	},

	computed: {
		isHomePage() {
			const route = useRoute();
			return route.path === "/"
		},
	},
}
</script>