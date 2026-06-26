<template>
  <h2>Usage</h2>
  <div>
    <pre>    
      <code class="language-ts">
      import { handlePiwikPRO } from '@piwikpro/nuxt-piwik-pro/utils';
      
      ...

      const nuxtApp = useNuxtApp();
      handlePiwikPRO(nuxtApp,($piwikPRO)=>{
         // Safety use any of Piwik PRO service here. 
      });
    </code>
  </pre>
  </div>
  <div class="or-divider"><span>OR</span></div>
  <div>
    <pre>
    <code class="language-ts"> 
      const {$piwikPRO} = useNuxtApp(); 
      if($piwikPRO){ 
        // Safety use any of Piwik PRO service here. 
      } 
    </code>
   </pre>
  </div>
</template>
