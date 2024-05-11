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

<script setup>
// INITIAL SCORE: 
// 32 - Performance

const { setAllImages } = useMainStore()
setAllImages()

// import meta type from nuxt 
const getSeoMeta = async () => {
	const query = `query getSeoMeta {
						_site {
							globalSeo {
							siteName
							titleSuffix
							fallbackSeo {
								image {
									url
								}
								description
								noIndex
								title
								twitterCard
							}
							}
							
							faviconMetaTags {
							tag
							attributes
							}
						}
					}`

	const { data: response } = await useGraphqlQuery({ query })

	if (response.value) {
		const { _site: { faviconMetaTags } } = response.value
		const { _site: { globalSeo } } = response.value

		const siteName = globalSeo.siteName ? globalSeo.siteName : "Anelill.com"  
		const titleSuffix = globalSeo?.titleSuffix ? globalSeo.titleSuffix : false
		const description = globalSeo.fallbackSeo?.description 
		const twitterCard = globalSeo.fallbackSeo?.twitterCard 
		const ogImage = globalSeo.fallbackSeo?.image?.url

		const faviconMeta = faviconMetaTags.map((item) => {
			const link = {
				rel: item.attributes.rel,
				type: item.attributes.type,
				sizes: item.attributes.sizes,
				href: item.attributes.href,
			}
			return link
		})

		const data = {
			head: {
				htmlAttrs: {
					lang: 'en'
				},
				link: faviconMeta,
			},
			seo: {
				title: titleSuffix.length ? `${siteName} - ${titleSuffix}` : siteName,
				description,
				ogTitle: siteName,
				ogDescription: description,
				ogImage: ogImage,
				ogUrl: 'anelill.com',
				twitterTitle: siteName,
				twitterDescription: description,
				twitterImage: ogImage,
				twitterCard,
				htmlAttrs: {
					lang: 'en'
				},
			}
		}
		return data
	}



}

const siteMeta = await getSeoMeta()

useSeoMeta(siteMeta.seo)
useHead(siteMeta.head)
</script>
