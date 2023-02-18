<template>
	<div>
		<PageHeader :headerImg="headerImages.contact"></PageHeader>
		<ContactForm></ContactForm>
	</div>
</template>

<script>
import { mapState } from 'pinia';
import { useMainStore } from '~~/stores/main';

export default {
	name: "contact",

	computed: {
		...mapState(useMainStore, ["headerImages"])
	},
}
</script>

