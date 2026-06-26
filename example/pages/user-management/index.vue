<script setup lang="ts">
import { onMounted, ref } from "vue";

const userId = ref("");
const visitorId = ref("");
const visitorInfo = ref({});
const pageData = {
  title: "UserManagement",
};

const callAsyncMethods = () =>
  usePiwikPro(async ({ UserManagement }) => {
    UserManagement.setUserId("UserId");
    const uId = await UserManagement.getUserId();
    userId.value = uId;
    const vId = await UserManagement.getVisitorId();
    visitorId.value = vId;
    const vInfo = await UserManagement.getVisitorInfo();
    visitorInfo.value = vInfo;
    UserManagement.resetUserId();
  });

onMounted(() => {
  callAsyncMethods();
});
</script>

<template>
  <Head>
    <Title>{{ pageData.title }}</Title>
  </Head>
  <div class="page-content">
    <h1>User Management</h1>
    <article>
      <ServicesUsageExample />
      <h2>Examples results</h2>
      <div>
        <p>
          <code class="language-ts">$piwikPRO.UserManagement.getUserId()</code>
          -
          {{ userId }}
        </p>
        <p>
          <code class="language-ts"
            >$piwikPRO.UserManagement.getVisitorId()</code
          >
          -
          {{ visitorId }}
        </p>
        <p>
          <code class="language-ts"
            >$piwikPRO.UserManagement.getVisitorInfo()</code
          >
          -
          {{ JSON.stringify(visitorInfo) }}
        </p>
      </div>
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
