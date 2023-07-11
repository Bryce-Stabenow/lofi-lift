// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // https://github.com/nuxt-modules/supabase
    "@nuxtjs/supabase",
    // UI lib (will be soon open sourced)
    "@nuxthq/ui",
    // https://github.com/nuxt-modules/color-mode
    "@nuxtjs/color-mode",
  ],
  ui: {
    icons: ["mdi", "heroicons", "heroicons-outline"],
  },
  // devtools: { enabled: true }
});
