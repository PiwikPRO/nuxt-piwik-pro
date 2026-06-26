<script lang="ts" setup>
const pageData = {
  title: "CustomEvent",
  heading: "Send Custom Events",
  description:
    "Content Tracking lets you track custom events not defined in rest of methods.",
  methods: [
    {
      method: "trackEvent",
      usage:
        "$piwikPRO.CustomEvent.trackEvent(category: string, action: string, name?: string | undefined, value?: number | undefined): void",
      desc: "Tracks manual content impression event.",
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
    <article>
      <ServicesUsageExample />
      <h2>Methods</h2>
      <ul>
        <li v-for="method in pageData.methods" :key="method.method">
          <h4>{{ method.method }}</h4>
          <p>{{ method.desc }}</p>
          <code class="language-ts">{{ method.usage }}</code>
        </li>
      </ul>
      <h2>Sample usage</h2>
      <p>
        To see tracking methods usage please turn developers tools in your
        browser and track results on the console.
      </p>
      <p>
        You can use methods from that collection in page props for example
        <code class="language-ts">onMounted</code> (methods are invoked when the
        page starts) or on the button click using
        <code class="language-ts">@click</code> prop.
      </p>
    </article>
  </div>
</template>
