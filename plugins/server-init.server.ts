import { useMainStore } from "~~/stores/main";
export default defineNuxtPlugin(async () => {
  if (!process.server)
    return;

	const store = useMainStore()
	store.setGalleryImages()
});