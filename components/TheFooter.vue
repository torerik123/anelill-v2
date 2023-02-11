<template>
	<h1>FOOTER</h1>
	<!-- <v-footer color="white" absolute app :class="customClass">
		<v-row dense no-gutters>
			<v-col cols="auto" align-self=center>
				<span>&copy; {{ new Date().getFullYear() }} | Ane Lill</span> 
			</v-col>
			<v-spacer></v-spacer>
			<v-col cols="auto">
				<v-btn icon large link href="https://www.instagram.com/byanelill" target="_blank"><v-icon>mdi-instagram</v-icon></v-btn>
			</v-col>
		</v-row>
	</v-footer> -->
</template>
<script>
export default {
	name: "TheFooter",

	props: {
		customClass: {
			type: String,
			default: "",
		}
	},
}
</script>