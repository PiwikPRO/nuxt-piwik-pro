# Piwik PRO Library for Nuxt

Dedicated Piwik PRO library that helps with implementing Piwik PRO Tag Manager and the Piwik PRO tracking client in Nuxt applications.

## Installation

### NPM

To use this package in your project, run the following command.

```
npm install @piwikpro/nuxt-piwik-pro
```

### Basic setup

In your Nuxt Project, include `@piwikpro/nuxt-piwik-pro` as a nuxt module in `nuxt.config.ts` file. To set up the Piwik PRO Tag Manager container in the app, pass configuration object as a module inline-options. Configuration options can be found below.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  //...
  modules: [
    [
      "@piwikpro/nuxt-piwik-pro",
      {
        containerId: process.env.PIWIK_PRO_CONTAINER_ID,
        containerUrl: process.env.PIWIK_PRO_CONTAINER_URL,
      },
    ],
  ],
  //...
});
```

#### Configuration options

```ts
type ConfigOptions {
 containerId: string;
 containerUrl: string;
 dataLayerName?: string;
 nonce?: string;
}
```

#### Nonce

The nonce attribute is useful to allow-list specific elements, such as a particular inline script or style elements. It can help you to avoid using the CSP unsafe-inline directive, which would allow-list all inline scripts or styles.

If you want your nonce to be passed to the script, pass it as the third argument when calling the script initialization method.

### Usage

Piwik PRO container will be initialized under the hood by `@piwikpro/nuxt-piwik-pro` module itself. Module also inject client-only plugin to Nuxt application instance which allow you to use all Piwik PRO services globally as a part of Nuxt context returned from `useNuxtApp()` composable as a `$piwikPRO`.

##### Remember that Piwik PRO is a client-only library. This means you won't have access to any of its services on the server side.

```ts
// In any component or other part of application code
const { $piwikPRO } = useNuxtApp();
// $piwikPRO won't be available on server-side code!
if (module.meta.client) {
  $piwikPRO.PageViews.trackPageView();
  $piwikPRO.GoalConversions.trackGoal(1, 100);
}
```

#### Usage with `usePiwikPro()`

To use Piwik PRO services safety, you can import `usePiwikPro()` from `'@piwikpro/nuxt-piwik-pro/composables'`.

```ts
// In any component or other part of application code
import { usePiwikPro } from "@piwikpro/nuxt-piwik-pro/composables";
// callback can be sync or async function
const userId = await usePiwikPro(
  ({ PageViews, GoalConversions, UserManagement }) => {
    PageViews.trackPageView();
    GoalConversions.trackGoal(1, 100);
    return UserManagement.getUserId();
  }
);
```

##### export `usePiwikPro()` as a Nuxt composable

To make this composable globally available, create `.ts` file in `/composables` directory and export `usePiwikPro()` from `'@piwikpro/nuxt-piwik-pro/composables'`.

```ts
// composables/usePiwikPro.ts
export { usePiwikPro } from "@piwikpro/nuxt-piwik-pro/composables";
```

```ts
// In any component or other part of application code
const userId = await usePiwikPro(
  ({ PageViews, GoalConversions, UserManagement }) => {
    PageViews.trackPageView();
    GoalConversions.trackGoal(1, 100);
    return UserManagement.getUserId();
  }
);
```

#### Usage with `<ClientOnly/>` Nuxt component

Alternatively, you can wrap Component with Piwik PRO usage by `<ClientOnly/>` nuxt component.

```ts
// In client-only <WithPiwikPROUsage/> component
const { $piwikPRO } = useNuxtApp();
$piwikPRO.PageViews.trackPageView();
$piwikPRO.GoalConversions.trackGoal(1, 100);
```

```ts
// Server-side code
<template>
   <ClientOnly fallback-tag="span" fallback="Loading comments...">
       <WithPiwikPROUsage/>
   </ClientOnly>
</template>
```

#### Usage in client-only page

Or if you want use PiwikPRO services directly in Page component, you can add `client` to its file name.

```ts
// In piwik-pro.client.ts page component
const { $piwikPRO } = useNuxtApp();
$piwikPRO.PageViews.trackPageView();
$piwikPRO.GoalConversions.trackGoal(1, 100);
```

## Examples of usage

Please explore the `./example` directory to get to know how to use this package with a specific examples and it's various methods.
