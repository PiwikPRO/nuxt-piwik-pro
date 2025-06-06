<script lang="ts" setup>
import { ref } from "vue";
import { useNuxtApp } from "nuxt/app";

const pageData = {
  title: "CookieManagement",
  heading: "Cookie management",
  description:
    "Collection of methods to manage cookies through the Piwik PRO API.",
  methods: [
    {
      name: "enableCookies",
      usage: "$piwikPRO.CookieManagement.enableCookies();",
      desc: "Enables all first party cookies. Cookies will be created on the next tracking request.",
      args: null,
    },
    {
      name: "disableCookies",
      usage: "$piwikPRO.CookieManagement.disableCookies();",
      desc: "Disables all first party cookies. Existing cookies will be deleted in the next page view.",
      args: null,
    },
    {
      name: "deleteCookies",
      usage: "$piwikPRO.CookieManagement.deleteCookies();",
      desc: "Deletes existing tracking cookies on the next page view.",
      args: null,
    },
    {
      name: "hasCookies",
      usage: "$piwikPRO.CookieManagement.hasCookies();",
      desc: "Returns true if cookies are enabled in this browser.",
      args: null,
    },
    {
      name: "setCookieNamePrefix",
      usage:
        '$piwikPRO.CookieManagement.setCookieNamePrefix("_examplePrefix_");',
      desc: 'Sets the prefix for analytics tracking cookies. Default is "_pk_".',
      args: "_examplePrefix_",
    },
    {
      name: "setCookieDomain",
      usage: '$piwikPRO.CookieManagement.setCookieDomain(".example.com");',
      desc: "Sets the domain for the analytics tracking cookies.",
      args: ".example.com",
    },
    {
      name: "getCookieDomain",
      usage: "$piwikPRO.CookieManagement.getCookieDomain();",
      desc: "Returns domain of the analytics tracking cookies (set with setCookieDomain()).",
      args: null,
    },
    {
      name: "setCookiePath",
      usage: '$piwikPRO.CookieManagement.setCookiePath("/blog/");',
      desc: "Sets the analytics tracking cookies path.",
      args: "/blog/",
    },
    {
      name: "getCookiePath",
      usage: "$piwikPRO.CookieManagement.getCookiePath();",
      desc: "Returns the analytics tracking cookies path.",
      args: null,
    },
    {
      name: "setSecureCookie",
      usage: "$piwikPRO.CookieManagement.setSecureCookie(true);",
      desc: "Toggles the secure cookie flag on all first party cookies (if you are using HTTPS).",
      args: true,
    },
    {
      name: "setVisitorCookieTimeout",
      usage: "$piwikPRO.CookieManagement.setVisitorCookieTimeout(33955200);",
      desc: "Sets the expiration time of visitor cookies.",
      args: 33955200,
    },
    {
      name: "getConfigVisitorCookieTimeout",
      usage: "$piwikPRO.CookieManagement.getConfigVisitorCookieTimeout();",
      desc: "Returns expiration time of visitor cookies (in milliseconds).",
      args: null,
    },
    {
      name: "setReferralCookieTimeout",
      usage: "$piwikPRO.CookieManagement.setReferralCookieTimeout(15768000);",
      desc: "Sets the expiration time of referral cookies.",
      args: 15768000,
    },
    {
      name: "setSessionCookieTimeout",
      usage: "$piwikPRO.CookieManagement.setSessionCookieTimeout(1800000);",
      desc: "Sets the expiration time of session cookies.",
      args: 1800000,
    },
    {
      name: "getSessionCookieTimeout",
      usage: "$piwikPRO.CookieManagement.getSessionCookieTimeout();",
      desc: "Returns expiration time of session cookies.",
      args: null,
    },
    {
      name: "setVisitorIdCookie",
      usage: "$piwikPRO.CookieManagement.setVisitorIdCookie();",
      desc: "Sets cookie containing analytics ID in browser.",
      args: null,
    },
  ],
};

const toastMessage = ref("");
const isToastVisible = ref(false);

const nuxtApp = useNuxtApp();

const showToast = (message: string) => {
  toastMessage.value = message;
  isToastVisible.value = true;
};
</script>

<template>
  <Head>
    <Title>{{ pageData.title }}</Title>
  </Head>
  <UContainer class="prose p-8">
    <h1>{{ pageData.heading }}</h1>
    <p>{{ pageData.description }}</p>
    <article>
      <ServicesUsageExample />
      <h2>Methods</h2>
      <ul>
        <li v-for="method in pageData.methods" :key="method.name">
          <h4>{{ method.name }}</h4>
          <p>{{ method.desc }}</p>
          <code class="lang-ts">{{ method.usage }}</code>
          <button
            class="btn"
            @click="
              () => {
                // @ts-ignore-next-line
                nuxtApp.$piwikPRO.CookieManagement[
                  method.name as keyof typeof nuxtApp.$piwikPRO.CookieManagement
                ](method.args);
                showToast(
                  `CookieManagement.${method.name}(${method.args ?? ''})`
                );
              }
            "
          >
            Execute
          </button>
        </li>
      </ul>
    </article>
  </UContainer>
  <Toast v-model="isToastVisible" :message="toastMessage" />
</template>
