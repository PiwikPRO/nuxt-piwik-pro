import { defineNuxtPlugin, useRequestEvent, useState } from "nuxt/app";
import { PIWIK_PRO_NONCE_STATE_KEY } from "../constants";

export default defineNuxtPlugin({
  name: "piwik-pro-nonce-bridge",
  enforce: "pre",
  setup() {
    useState<string>(PIWIK_PRO_NONCE_STATE_KEY, () => {
      if (import.meta.server) {
        const event = useRequestEvent();
        const n = event?.context?.security?.nonce;
        return typeof n === "string" ? n : "";
      }
      return "";
    });
  },
});
