export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxtjs/eslint-module",
    [
      "@piwikpro/nuxt-piwik-pro",
      {
        containerId:
          process.env.PIWIK_PRO_CONTAINER_ID ||
          "0a0b8661-8c10-4d59-e8fg-1h926ijkl184",
        containerUrl:
          process.env.PIWIK_PRO_CONTAINER_URL || "https://example.piwik.pro",
        dataLayerName: process.env.PIWIK_PRO_DATA_LAYER_NAME,
      },
    ],
  ],
});
