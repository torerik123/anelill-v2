import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
	plugins: [vue()],
	test: {
		environment: "happy-dom",
		globals: true,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
		},
		css: true,
		server: {
			deps: {
				inline: ['vuetify']
			}
		},
	},
});
