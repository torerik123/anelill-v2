<template>	
	<v-app dark>
		<TheHeader class="app"></TheHeader>
		<v-main class="app">
			<v-container fluid :class="$vuetify.display.smAndDown ? 'px-5 py-0' : 'px-15 py-0'">
				<slot></slot>
			</v-container>
		</v-main>
		<TheFooter class="app"></TheFooter>
	</v-app>
</template>

<script>
export default {
	name: 'DefaultLayout',
}
</script>

<style>
.app {
	font-family: "Sono", sans-serif !important;
}
</style>