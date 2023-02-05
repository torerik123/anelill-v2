<template>
	<v-app dark>
		<v-main class="app">
			<TheHeader class="app" :customClass="$vuetify.display.smAndDown ? 'px-5' : 'px-15'"></TheHeader>
			<v-container fluid :class="$vuetify.display.smAndDown ? 'px-5 py-0' : 'px-15 py-0'">
				<slot></slot>
			</v-container>
		</v-main>
		<!-- <TheFooter class="app" :customClass="$vuetify.display.smAndDown ? 'px-5' : 'px-15'"></TheFooter> -->
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