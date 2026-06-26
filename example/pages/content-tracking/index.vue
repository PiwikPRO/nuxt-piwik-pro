<script setup lang="ts">
import { onMounted } from "vue";

const pageData = {
  title: "ContentTracking",
  heading: "Content Tracking Service",
  description:
    "Content Tracking lets you track what content is visible on your site and how users interact with it.",
  methods: [
    {
      method: "trackContentImpression",
      usage:
        "$piwikPRO.ContentTracking.trackContentImpression(contentName: string, contentPiece: string, contentTarget: string)",
      desc: "Tracks manual content impression event.",
    },
    {
      method: "trackContentInteraction",
      usage:
        "$piwikPRO.ContentTracking.trackContentInteraction(contentInteraction: string, contentName: string, contentPiece: string, contentTarget: string)",
      desc: "Tracks manual content interaction event.",
    },
  ],
};

onMounted(() => {
  usePiwikPro(({ ContentTracking }) => {
    ContentTracking.trackContentImpression(
      "contentName",
      "contentPiece",
      "contentTarget"
    );

    ContentTracking.trackContentInteraction(
      "contentInteraction",
      "contentName",
      "contentPiece",
      "contentTarget"
    );
  });
});
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
        <code class="language-ts"
          ><span>{{ method.usage }}</span></code
        >
      </li>
    </ul>
    <h2>Sample usage</h2>
    <p>
      To see tracking methods usage please turn developers tools in your browser
      and track results on the console.
    </p>
    <p>
      You can use methods from that collection in page props for example
      <code class="language-js">onMounted</code> (methods are invoked when the
      page starts) or on the button click using
      <code class="language-js">@click</code> prop.
    </p>
  </div>
</template>
