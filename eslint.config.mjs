// @ts-check
import { createConfigForNuxt } from "@nuxt/eslint-config/flat";
import prettierRecommended from "eslint-plugin-prettier/recommended";

export default createConfigForNuxt()
  .prepend({
    ignores: ["dist", "docs", "docs_raw", "coverage", "example", "scripts"],
  })
  .append(prettierRecommended, {
    rules: {
      "vue/no-multiple-template-root": "off",
      "vue/multi-word-component-names": "off",
    },
  });
