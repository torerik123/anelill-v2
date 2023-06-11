<template>
	<div>
		<ClientOnly>
			<PageHeader v-if="headerImg" :headerImg="headerImg"></PageHeader>
		</ClientOnly>
		<SectionHeader text="Gallery"></SectionHeader>
		<ImageGallery></ImageGallery>	
	</div>
</template>

<script>
export default {
	name: "Gallery",

	data:() => ({
		headerImg: false,
	}),
}
</script>