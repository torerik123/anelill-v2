<template>
	<div>
		<ClientOnly>
			<PageHeader v-if="headerImg.length" :headerImg="headerImg"></PageHeader>
		</ClientOnly>
		<ContactForm></ContactForm>
	</div>
</template>

<script>
export default {
	name: "contact",

	data:() => ({
		headerImg: "",
	}),

	async created() {
		const query = `
			query headerImg {
				contact {
					headerImage {
						responsiveImage(imgixParams: {auto: format}) {
						src
						}
					}
				}
			}
		`

		const { data: response } = useGraphqlQuery({ query })

		if (response.value) {
			this.headerImg = response.value.contact.headerImage.responsiveImage.src
		}
	},
}
</script>

