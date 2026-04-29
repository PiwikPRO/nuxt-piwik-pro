export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  tailwindcss: {
    config: {
      plugins: ["@tailwindcss/typography"],
    },
  },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/eslint-module",
    [
      "@piwikpro/nuxt-piwik-pro",
      {
        containerId:
          process.env.PIWIK_PRO_CONTAINER_ID || "https://example.piwik.pro",
        containerUrl:
          process.env.PIWIK_PRO_CONTAINER_URL ||
          "0a0b8661-8c10-4d59-e8fg-1h926ijkl184",
        dataLayerName: process.env.PIWIK_PRO_DATA_LAYER_NAME,
      },
    ],
  ],
});
