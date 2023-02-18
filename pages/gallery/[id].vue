<template>
	<div>
		<ImageCarousel :index="parseInt(useRoute().params.id)"></ImageCarousel>
	</div>
</template>

<script>
export default {
	name: "InfoPage",
}
</script>