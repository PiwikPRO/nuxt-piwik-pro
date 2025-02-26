<script lang="ts" setup>
import { ref } from "vue";

const pageData = {
  title: "GoalConversions",
  heading: "Goal Conversions",
  description:
    "Goals let you define important actions registered in your application and track conversions when the conditions for the action are fulfilled.",
  methods: [
    {
      method: "trackGoal",
      usage:
        "$piwikPRO.GoalConversions.trackGoal(goalId: number | string, conversionValue: number, dimensions?: Object)",
      desc: "Tracks manual goal conversion.",
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
      <h2>Methods</h2>
      <ul>
        <li v-for="method in pageData.methods" :key="method.method">
          <h4>{{ method.method }}</h4>
          <p>{{ method.desc }}</p>
          <code class="lang-ts">{{ method.usage }}</code>
        </li>
      </ul>
      <h2>Sample usage</h2>
      <p>
        To see tracking methods usage please turn developers tools in your
        browser and track results on the console.
      </p>
      <p>
        You can use methods from that collection in page props for example
        <code class="lang-ts">onMounted</code> (methods are invoked when the
        page starts) or on the button click using
        <code class="lang-ts">@click</code> prop.
      </p>
    </article>
    <button
      class="btn"
      @click="
        () => {
          nuxtApp.$piwikPRO.GoalConversions.trackGoal(2, 40, undefined, {
            currencyCode: 'USD',
          });
          showToast('GoalConversions.trackGoal(2, 40)');
        }
      "
    >
      GoalConversions.trackGoal
    </button>
  </UContainer>
  <Toast v-model="isToastVisible" :message="toastMessage" />
</template>
