import { readFileSync, writeFileSync } from "node:fs";

const README = "README.md";

const file = readFileSync(README, "utf-8");

const formattedOutput = file
  .split("\n")
  // drop the redundant package-name index heading ("## @piwikpro/nuxt-piwik-pro")
  .filter((line) => !line.includes("# @piwikpro/nuxt-piwik-pro"))
  // promote the main title to a top-level heading
  .map((line) =>
    line.replace(
      "## Piwik PRO Library for Nuxt",
      "# Piwik PRO Library for Nuxt"
    )
  )
  .join("\n");

writeFileSync(README, formattedOutput);
