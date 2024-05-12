<template>
	<v-footer color="white" absolute app :class="$vuetify.display.smAndDown ? 'px-5' : 'px-15'">
		<v-row dense no-gutters>
			<v-col cols="auto" align-self=center>
				<span>&copy; {{ new Date().getFullYear() }} | Ane Lill</span> 
			</v-col>
			<v-spacer></v-spacer>
			<v-col cols="auto">
				<v-btn 
					icon 
					large 
					link
					variant="text" 
					href="https://www.instagram.com/byanelill" 
					target="_blank"
					aria-label="instagram-link"
				>
						<v-icon>mdi-instagram</v-icon>
					</v-btn>
			</v-col>
		</v-row>
	</v-footer>
</template>
<script>
export default {
	name: "TheFooter",
}
</script>