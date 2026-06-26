<script lang="ts" setup>
import { onMounted, ref } from "vue";

const customDimValue = ref<string>("");

const { add: showToast } = useToast();

const { $piwikPRO } = useNuxtApp();

const callAsyncMethods = async () => {
  const { CustomDimensions } = $piwikPRO;
  CustomDimensions.setCustomDimensionValue(12, "value");
  const cDimValue = await CustomDimensions.getCustomDimensionValue(12);
  customDimValue.value = cDimValue ?? "";
  CustomDimensions.deleteCustomDimension("12");
};

onMounted(() => {
  callAsyncMethods();
});
</script>

<template>
  <div class="prose">
    <h2>Examples results</h2>
    <div>
      <p>
        <code class="language-ts"
          >$piwikPRO.CustomDimensions.getCustomDimensionValue()</code
        >
        -
        {{ customDimValue }}
      </p>
    </div>
    <h2>Sample usage</h2>
    <p>
      To see tracking methods usage please turn developers tools in your browser
      and track results on the console.
    </p>
    <p>
      You can use methods from that collection in page props for example{' '}
      <code class="language-ts">onMounted</code> (methods are invoked when the
      page starts) or as on example below on the button click using
      <code class="language-ts">@click</code> event.
    </p>
    <button
      class="btn"
      @click="
        () => {
          $piwikPRO.CustomDimensions.setCustomDimensionValue(12, 'value');
          showToast('CustomDimensions.setCustomDimensionValue(12, \'value\')');
        }
      "
    >
      CustomDimensions.setCustomDimensionValue
    </button>
    <button
      class="btn"
      @click="
        async () => {
          $piwikPRO.CustomDimensions.getCustomDimensionValue(12);
          customDimValue =
            (await $piwikPRO.CustomDimensions.getCustomDimensionValue(12)) ??
            '';
          showToast('CustomDimensions.getCustomDimensionValue(12)');
        }
      "
    >
      CustomDimensions.getCustomDimensionValue
    </button>
    <button
      class="btn"
      @click="
        () => {
          $piwikPRO.CustomDimensions.deleteCustomDimension('12');
          showToast('CustomDimensions.deleteCustomDimension(\'12\')');
        }
      "
    >
      CustomDimensions.deleteCustomDimension
    </button>
  </div>
</template>
