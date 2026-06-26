<script lang="ts" setup>
const pageData = {
  title: "DownloadAndOutlink",
  heading: "Download and outlink Service",
  description:
    "Manually tracks outlink or download event with provided values.",
  methods: [
    {
      method: "trackLink",
      usage:
        "$piwikPRO.DownloadAndOutlink.trackLink(url: string, linkType: string, customData?: object, callback?: (params: any) => void)",
      desc: "Manually tracks outlink or download event with provided values.",
    },
    {
      method: "enableLinkTracking",
      usage: "$piwikPRO.DownloadAndOutlink.enableLinkTracking(enable: boolean)",
      desc: "Enables or disables automatic link tracking. If enabled, left, right and middle clicks on links will be treated as opening a link. Opening a links to an external site (different domain) creates an outlink event. Opening a link to a downloadable file creates a download event.",
    },
    {
      method: "setLinkClasses",
      usage: "$piwikPRO.DownloadAndOutlink.setLinkClasses(classes: string[])",
      desc: "Sets a list of class names that indicate whether a link is an outlink and not download.",
    },
    {
      method: "setDownloadClasses",
      usage:
        "$piwikPRO.DownloadAndOutlink.setDownloadClasses(classes: string[])",
      desc: "Sets a list of class names that indicate whether a list is a download and not an outlink.",
    },
    {
      method: "setDownloadExtensions",
      usage:
        "$piwikPRO.DownloadAndOutlink.setDownloadExtensions(extensions: string[])",
      desc: "Overwrites the list of file extensions indicating that a link is a download.",
    },
    {
      method: "addDownloadExtensions",
      usage:
        "$piwikPRO.DownloadAndOutlink.addDownloadExtensions(extensions: string[])",
      desc: "Adds new extensions to the download extensions list.",
    },
    {
      method: "removeDownloadExtensions",
      usage:
        "$piwikPRO.DownloadAndOutlink.removeDownloadExtensions(extensions: string[])",
      desc: "Removes extensions from the download extensions list.",
    },
    {
      method: "setLinkTrackingTimer",
      usage: "$piwikPRO.DownloadAndOutlink.setLinkTrackingTimer(time: number)",
      desc: "When a visitor produces an events and closes the page immediately afterwards, e.g. when opening a link, the request might get cancelled. To avoid loosing the last event this way, JavaScript Tracking Client will lock the page for a fraction of a second (if wait time hasn’t passed), giving the request time to reach the Collecting & Processing Pipeline.",
    },
    {
      method: "getLinkTrackingTimer",
      usage: "$piwikPRO.DownloadAndOutlink.getLinkTrackingTimer()",
      desc: "Returns lock/wait time after a request set by setLinkTrackingTimer.",
    },
    {
      method: "setIgnoreClasses",
      usage: "$piwikPRO.DownloadAndOutlink.setIgnoreClasses(classes: string[])",
      desc: "Set a list of class names that indicate a link should not be tracked.",
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
    <div>
      <p>{{ pageData.description }}</p>
    </div>
    <article>
      <h2>Methods</h2>
      <ServicesUsageExample />
      <ul>
        <li v-for="method in pageData.methods" :key="method.method">
          <h4>{{ method.method }}</h4>
          <p>{{ method.desc }}</p>
          <code class="language-ts">{{ method.usage }}</code>
        </li>
      </ul>
      <DownloadAndOutlinkExamples />
    </article>
  </div>
</template>
