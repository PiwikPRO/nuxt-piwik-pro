<script lang="ts" setup>
import Toast from "./Toast.vue";
import { onMounted, ref } from "vue";

const toastMessage = ref("");
const isToastVisible = ref(false);

const showToast = (message: string) => {
  toastMessage.value = message;
  isToastVisible.value = true;
};

const linkTrackingTimer = ref<string | number>("");

const callAsyncMethods = async () =>
  usePiwikPro(async ({ DownloadAndOutlink }) => {
    DownloadAndOutlink.trackLink("http://localhost:3000", "link");
    DownloadAndOutlink.enableLinkTracking(true);
    DownloadAndOutlink.setLinkClasses(["this-is-an-outlink"]);
    DownloadAndOutlink.setDownloadClasses(["this-is-a-download"]);
    DownloadAndOutlink.setDownloadExtensions(["zip"]);
    DownloadAndOutlink.addDownloadExtensions(["7z"]);
    DownloadAndOutlink.removeDownloadExtensions(["pdf", "xlsx"]);
    DownloadAndOutlink.setLinkTrackingTimer(10);
    const lTrackingTimer = await DownloadAndOutlink.getLinkTrackingTimer();
    linkTrackingTimer.value = lTrackingTimer;
    DownloadAndOutlink.setIgnoreClasses(["do-not-track"]);
  });

onMounted(() => {
  callAsyncMethods();
});
</script>

<template>
  <div class="prose p-8">
    <h2>Examples results</h2>
    <div>
      <p>
        <code class="lang-ts">DownloadAndOutlink.getLinkTrackingTimer()</code> -
        {{ linkTrackingTimer }}
      </p>
    </div>
    <h2>Sample usage</h2>
    <p>
      To see tracking methods usage please turn developers tools in your browser
      and track results on the console.
    </p>
    <p>
      You can use methods from that collection in page props for example
      <code class="lang-ts">onMounted</code> (methods are invoked when the page
      starts) or as on example below on the button click using
      <code class="lang-ts">@click</code> event.
    </p>
    <div>
      <button
        class="btn mr-5 mt-5"
        @click="
          () =>
            usePiwikPro(({ DownloadAndOutlink }) => {
              DownloadAndOutlink.trackLink('http://localhost:3000', 'link');
              showToast(
                'DownloadAndOutlink.trackLink(\'http://localhost:3000\', \'link\')'
              );
            })
        "
      >
        DownloadAndOutlink.trackLink
      </button>
      <button
        class="btn mr-5 mt-5"
        @click="
          () =>
            usePiwikPro(({ DownloadAndOutlink }) => {
              DownloadAndOutlink.enableLinkTracking(true);
              showToast('DownloadAndOutlink.enableLinkTracking(true)');
            })
        "
      >
        DownloadAndOutlink.enableLinkTracking
      </button>
      <button
        class="btn mr-5 mt-5"
        @click="
          () =>
            usePiwikPro(({ DownloadAndOutlink }) => {
              DownloadAndOutlink.setLinkClasses(['this-is-an-outlink']);
              showToast(
                'DownloadAndOutlink.setLinkClasses([\'this-is-an-outlink\'])'
              );
            })
        "
      >
        DownloadAndOutlink.setLinkClasses
      </button>
      <button
        class="btn mr-5 mt-5"
        @click="
          () =>
            usePiwikPro(({ DownloadAndOutlink }) => {
              DownloadAndOutlink.setDownloadClasses(['this-is-a-download']);
              showToast(
                'DownloadAndOutlink.setDownloadClasses([\'this-is-a-download\'])'
              );
            })
        "
      >
        DownloadAndOutlink.setDownloadClasses
      </button>
      <button
        class="btn mr-5 mt-5"
        @click="
          () =>
            usePiwikPro(({ DownloadAndOutlink }) => {
              DownloadAndOutlink.addDownloadClasses(['this-is-a-download']);
              showToast(
                'DownloadAndOutlink.addDownloadClasses([\'this-is-a-download\'])'
              );
            })
        "
      >
        DownloadAndOutlink.addDownloadClasses
      </button>
      <button
        class="btn mr-5 mt-5"
        @click="
          () =>
            usePiwikPro(({ DownloadAndOutlink }) => {
              DownloadAndOutlink.removeDownloadClasses(['this-is-a-download']);
            })
        "
      >
        DownloadAndOutlink.removeDownloadClasses
      </button>
      <button
        class="btn mr-5 mt-5"
        @click="
          () =>
            usePiwikPro(({ DownloadAndOutlink }) => {
              DownloadAndOutlink.addDownloadExtensions(['rar']);
              showToast(
                'DownloadAndOutlink.addDownloadExtensions - add RAR tracking'
              );
            })
        "
      >
        DownloadAndOutlink.addDownloadExtensions - add RAR tracking
      </button>
      <button
        class="btn mr-5 mt-5"
        @click="
          () =>
            usePiwikPro(({ DownloadAndOutlink }) => {
              DownloadAndOutlink.removeDownloadExtensions(['rar']);
              showToast(
                'DownloadAndOutlink.removeDownloadExtensions - remove RAR tracking'
              );
            })
        "
      >
        DownloadAndOutlink.removeDownloadExtensions - remove RAR tracking
      </button>
      <button
        class="btn mr-5 mt-5"
        @click="
          () =>
            usePiwikPro(({ DownloadAndOutlink }) => {
              DownloadAndOutlink.setIgnoreClasses(['do-not-track']);
              showToast(
                'DownloadAndOutlink.setIgnoreClasses([\'do-not-track\'])'
              );
            })
        "
      >
        DownloadAndOutlink.setIgnoreClasses
      </button>
      <button
        class="btn mr-5 mt-5"
        @click="
          () =>
            usePiwikPro(({ DownloadAndOutlink }) => {
              DownloadAndOutlink.setLinkTrackingTimer(20);
              showToast('DownloadAndOutlink.setLinkTrackingTimer(20)');
            })
        "
      >
        DownloadAndOutlink.setLinkTrackingTimer
      </button>
      <button
        class="btn mr-5 mt-5"
        @click="
          () => {
            callAsyncMethods();
            showToast('callAsyncMethods');
          }
        "
      >
        CustomDimensions.getCustomDimensionValue
      </button>
    </div>
    <h2>Example download</h2>
    <div>
      <a href="/files/example.zip">Download ZIP</a> - tracked download
      <br />
      <a href="/files/example.pdf">Download PDF</a> - outlink
      <br />
      <a href="/files/example.rar">Download RAR</a> - download tracked disabled
      by default, you can turn on/off by button
      <br />
      <a class="do-not-track" href="/files/example.xlsx"> Download XLSX </a> -
      download turned off by default using className
      <br />
      <a class="this-is-a-download" href="/files/example.xlsx">
        Download XLSX
      </a>
      download turned on by default using className
    </div>
  </div>
  <Toast v-model="isToastVisible" :message="toastMessage" />
</template>
