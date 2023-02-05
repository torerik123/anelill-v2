export const useMainStore = defineStore('main', {
	state: () => ({
		count: 0,
	}),
	getters: {
		doubleCount: (state) => state.count * 2,
	},
})