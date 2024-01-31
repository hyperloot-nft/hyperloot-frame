// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['nuxt-og-image', '@pinia/nuxt'],
	runtimeConfig: {
		public: {
			domain: '',
		},
	},
});
  