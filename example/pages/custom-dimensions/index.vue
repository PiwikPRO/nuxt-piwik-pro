<script lang="ts" setup>
const pageData = {
  title: "CustomDimensions",
  heading: "Custom Dimensions",
  description:
    "Collection of methods to manage custom dimensions through the Piwik PRO API.",
  methods: [
    {
      method: "setCustomDimensionValue",
      usage:
        "$piwikPRO.CustomDimensions.setCustomDimensionValue(customDimensionId: string | number, customDimensionValue: string)",
      desc: "Sets a custom dimension value to be used later.",
    },
    {
      method: "deleteCustomDimension",
      usage:
        "$piwikPRO.CustomDimensions.deleteCustomDimension(customDimensionId: string)",
      desc: "Removes a custom dimension with the specified ID.",
    },
    {
      method: "getCustomDimensionValue",
      usage:
        "$piwikPRO.CustomDimensions.getCustomDimensionValue(customDimensionId: string | number)",
      desc: "Returns the value of a custom dimension with the specified ID.",
    },
  ],
};
</script>

<template>
  <Head>
    <Title>{{ pageData.title }}</Title>
  </Head>
  <div class="page-content">
    <h1>{{ pageData.heading }}</h1>
    <p>{{ pageData.description }}</p>
    <ServicesUsageExample />
    <h2>Methods</h2>
    <ul>
      <li v-for="method in pageData.methods" :key="method.method">
        <h4>{{ method.method }}</h4>
        <p>{{ method.desc }}</p>
        <code class="language-js">{{ method.usage }}</code>
      </li>
    </ul>
    <ClientOnly fallback-tag="span" fallback="Loading...">
      <CustomDimensionResults />
    </ClientOnly>
  </div>
</template>
