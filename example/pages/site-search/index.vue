<script lang="ts" setup>
const pageData = {
  title: "SiteSearch",
  heading: "Site Search Service",
  description:
    "Site search tracking gives you insights into how visitors interact with the search engine on your website - what they search for and how many results they get back.",
  methods: [
    {
      method: "trackSiteSearch",
      usage:
        "$piwikPRO.SiteSearch.trackSiteSearch(keyword: string, category?: string, searchCount?: number, dimensions?: Object)",
      desc: "Tracks search requests on a website.",
    },
  ],
};

const { $piwikPRO } = useNuxtApp();

const { add: showToast } = useToast();
</script>

<template>
  <Head>
    <Title>{{ pageData.title }}</Title>
  </Head>
  <div class="page-content">
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
        page starts), as on example below on the button click using
        <code class="language-ts">@click</code>event or text input.
      </p>
      <SearchAndList />
      <div>
        <button
          class="btn"
          @click="
            () => {
              $piwikPRO.SiteSearch.trackSiteSearch('keyword', 'button', 4);
              showToast(
                'SiteSearch.trackSiteSearch(\'keyword\', \'button\', 4)'
              );
            }
          "
        >
          SiteSearch.trackSiteSearch
        </button>
      </div>
    </article>
  </div>
</template>
