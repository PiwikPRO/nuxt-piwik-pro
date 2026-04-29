import "../schema";
import { addPlugin, defineNuxtModule, useLogger } from "nuxt/kit";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { PluginArgs } from "../types";

export default defineNuxtModule<PluginArgs>({
  meta: {
    name: "piwik-pro",
    configKey: "piwikPro",
  },
  setup(options, nuxt) {
    if (!options.containerUrl || !options.containerId) {
      throw Error(
        "@piwikpro/nuxt-piwik-pro module cannot run without 'containerUrl' and 'containerId' because they are required. Pass them as a module inline-options."
      );
    }

    const { cspNonceBridge, ...publicOptions } = options;

    if (publicOptions.nonce !== undefined) {
      useLogger("piwik-pro").warn(
        "The `nonce` module option is not safe for CSP when set in static config: the same value is sent to every visitor and does not rotate per response. Prefer a per-request nonce (for example via nuxt-security) and `cspNonceBridge: true`."
      );
    }

    nuxt.options.runtimeConfig.public = {
      ...nuxt.options.runtimeConfig.public,
      ...publicOptions,
      piwikProCspNonceBridge: Boolean(cspNonceBridge),
    };

    if (cspNonceBridge) {
      addPlugin({
        src: resolve(
          dirname(fileURLToPath(import.meta.url)),
          "..",
          "plugin",
          "nonce-bridge"
        ),
        name: "piwik-pro-nonce-bridge",
      });
    }

    addPlugin({
      src: resolve(dirname(fileURLToPath(import.meta.url)), "..", "plugin"),
      mode: "client",
      name: "piwik-pro",
    });
  },
});
