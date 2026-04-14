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

    const { nonce, cspNonceBridge, ...publicOptions } = options;

    if (nonce !== undefined) {
      useLogger("piwik-pro").warn(
        "The `nonce` module option is ignored: it cannot be a proper per-response CSP nonce when set in config. Use a per-request nonce (for example via nuxt-security) and enable `cspNonceBridge: true`. See module documentation."
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
