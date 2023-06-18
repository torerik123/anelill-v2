<template>
	<div>
		<ClientOnly>
			<PageHeader 
				v-if="headerImages.contact.src.length" 
				:headerImg="headerImages.contact.src" 
				:srcSet="headerImages.contact.srcSet"
			>
			</PageHeader>
		</ClientOnly>
		<ContactForm></ContactForm>
	</div>
</template>

<script>
import { mapState } from "pinia"

export default {
	name: "contact",

	computed: {
		...mapState(useMainStore, ["headerImages"]),
	},
}
</script>

