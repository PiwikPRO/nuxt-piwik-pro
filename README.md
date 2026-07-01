
<a name="readmemd"></a>

# Piwik PRO Library for Nuxt

Dedicated Piwik PRO library that helps with implementing Piwik PRO Tag Manager, Piwik PRO Consent Manager and Piwik PRO tracking client in Nuxt applications.

### Installation

#### NPM

To use this package in your project, run the following command.

```
npm install @piwikpro/nuxt-piwik-pro
```

#### Basic setup

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

##### Configuration options

```ts
type PluginArgs {
 containerId: string;
 containerUrl: string;
 dataLayerName?: string;
 cspNonceBridge?: boolean;
}
```

##### Nonce

The nonce attribute is useful to allow-list specific elements, such as a particular inline script or style elements. It can help you to avoid using the CSP unsafe-inline directive, which would allow-list all inline scripts or styles.

This package provides an option, `cspNonceBridge`, that lets it retrieve the `nonce` attribute provided by plugins such as `nuxt-security` and apply it to the container.

Example config:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["nuxt-security", "@piwikpro/nuxt-piwik-pro"],
  piwikPro: {
    containerId: process.env.PIWIK_PRO_CONTAINER_ID!,
    containerUrl: process.env.PIWIK_PRO_CONTAINER_URL!,
    cspNonceBridge: true,
  },
});
```

#### Usage

Piwik PRO container will be initialized under the hood by `@piwikpro/nuxt-piwik-pro` module itself. Module also inject client-only plugin to Nuxt application instance which allow you to use all Piwik PRO services globally as a part of Nuxt context returned from `useNuxtApp()` composable as a `$piwikPRO`.

###### Remember that Piwik PRO is a client-only library. This means you won't have access to any of its services on the server side.

```ts
// In any component or other part of application code
const { $piwikPRO } = useNuxtApp();
// $piwikPRO won't be available on server-side code!
if (module.meta.client) {
  $piwikPRO.PageViews.trackPageView();
  $piwikPRO.GoalConversions.trackGoal(1, 100);
}
```

##### Usage with `usePiwikPro()`

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

###### export `usePiwikPro()` as a Nuxt composable

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

##### Usage with `<ClientOnly/>` Nuxt component

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

##### Usage in client-only page

Or if you want use PiwikPRO services directly in Page component, you can add `client` to its file name.

```ts
// In piwik-pro.client.ts page component
const { $piwikPRO } = useNuxtApp();
$piwikPRO.PageViews.trackPageView();
$piwikPRO.GoalConversions.trackGoal(1, 100);
```

### Examples of usage

Please explore the `./example` directory to get to know how to use this package with a specific examples and it's various methods.


<a name="globalsmd"></a>


### Type Aliases

#### Dimensions

> **Dimensions**: `Record`\<\`dimension$\{number\}\`, `string`\>

***

#### EcommerceOptions

> **EcommerceOptions**: `object`

##### Type declaration

| Name | Type | Description |
| ------ | ------ | ------ |
| `currencyCode`? | `string` | Currency code in [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format. If not provided, the currency set in app settings will be used instead. |

***

#### Initialize()

> **Initialize**: (`containerId`, `containerUrl`, `nonceOrOptions`?) => `void`

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `containerId` | `string` |
| `containerUrl` | `string` |
| `nonceOrOptions`? | `string` \| [`InitOptions`](#initoptions) |

##### Returns

`void`

***

#### InitOptions

> **InitOptions**: `object`

##### Type declaration

| Name | Type | Description |
| ------ | ------ | ------ |
| `dataLayerName`? | `string` | Defaults to 'dataLayer' |
| `nonce`? | `string` | - |

***

#### PaymentInformation

> **PaymentInformation**: `object`

##### Type declaration

| Name | Type |
| ------ | ------ |
| `discount`? | `number` \| `string` |
| `grandTotal` | `number` \| `string` |
| `orderId` | `string` |
| `shipping`? | `number` \| `string` |
| `subTotal`? | `number` \| `string` |
| `tax`? | `number` \| `string` |

***

#### PiwikPROHandler()\<T\>

> **PiwikPROHandler**\<`T`\>: (`piwikPRO`) => `T` \| `Promise`\<`T`\>

##### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `piwikPRO` | [`PiwikPROServicesType`](#piwikproservicestype) |

##### Returns

`T` \| `Promise`\<`T`\>

***

#### PiwikPROServicesType

> **PiwikPROServicesType**: *typeof* `PiwikPROServices`

***

#### PluginArgs

> **PluginArgs**: `object` & [`InitOptions`](#initoptions)

##### Type declaration

| Name | Type |
| ------ | ------ |
| `containerId` | `string` |
| `containerUrl` | `string` |
| `cspNonceBridge`? | `boolean` |

***

#### Product

> **Product**: `object`

##### Type declaration

| Name | Type |
| ------ | ------ |
| `brand`? | `string` |
| `category`? | `LimitedArrayFiveStrings` |
| `customDimensions`? | `Record`\<`number`, `string`\> |
| `name`? | `string` |
| `price`? | `number` |
| `quantity`? | `number` |
| `sku` | `string` |
| `variant`? | `string` |

***

#### VisitorInfo

> **VisitorInfo**: [`"0"` \| `"1"`, `string`, `number`, `string` \| `number`, `number`, `number` \| `""`, `number` \| `""`]

### Variables

#### PiwikPRO

> `const` **PiwikPRO**: *typeof* `PiwikPRO.default`

### Functions

#### default()

> **default**(`this`, `resolvedOptions`, `nuxt`): `ModuleSetupReturn`

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `this` | `void` |
| `resolvedOptions` | [`PluginArgs`](#pluginargs) |
| `nuxt` | `Nuxt` |

##### Returns

`ModuleSetupReturn`

### Namespaces

- [ClientConfiguration](#namespacesclientconfigurationmd)
- [ContentTracking](#namespacescontenttrackingmd)
- [CookieManagement](#namespacescookiemanagementmd)
- [CrossDomainTracking](#namespacescrossdomaintrackingmd)
- [CustomDimensions](#namespacescustomdimensionsmd)
- [CustomEvent](#namespacescustomeventmd)
- [DataLayer](#namespacesdatalayermd)
- [DownloadAndOutlink](#namespacesdownloadandoutlinkmd)
- [eCommerce](#namespacesecommercemd)
- [ErrorTracking](#namespaceserrortrackingmd)
- [GoalConversions](#namespacesgoalconversionsmd)
- [Heartbeat](#namespacesheartbeatmd)
- [Miscellaneous](#namespacesmiscellaneousmd)
- [PageViews](#namespacespageviewsmd)
- [SiteSearch](#namespacessitesearchmd)
- [UserManagement](#namespacesusermanagementmd)


<a name="namespacesclientconfigurationmd"></a>

## ClientConfiguration

### Functions

#### getDomains()

> **getDomains**(): `Promise`\<`string`[]\>

Returns list of internal domains (set with "setDomains" function and used in outlink tracking).

##### Returns

`Promise`\<`string`[]\>

***

#### setDomains()

> **setDomains**(`domains`): `void`

Allows to define a list of internal domains or mobile app URIs. Used in outlink tracking for determining whether a link is an outlink and in cross domain linking for determining which links should have visitor ID parameter injected.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `domains` | `string`[] |

##### Returns

`void`


<a name="namespacescontenttrackingmd"></a>

## ContentTracking

### Functions

#### logAllContentBlocksOnPage()

> **logAllContentBlocksOnPage**(): `void`

Print all content blocks to the console for debugging purposes

##### Returns

`void`

***

#### trackAllContentImpressions()

> **trackAllContentImpressions**(): `void`

Scans the entire DOM for content blocks and tracks impressions after all page
elements load. It does not send duplicates on repeated calls unless
trackPageView was called in between trackAllContentImpressions invocations

##### Returns

`void`

***

#### trackContentImpression()

> **trackContentImpression**(`contentName`, `contentPiece`, `contentTarget`): `void`

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `contentName` | `string` |
| `contentPiece` | `string` |
| `contentTarget` | `string` |

##### Returns

`void`

***

#### trackContentImpressionsWithinNode()

> **trackContentImpressionsWithinNode**(`domNode`): `void`

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `domNode` | `Node` |

##### Returns

`void`

***

#### trackContentInteraction()

> **trackContentInteraction**(`contentInteraction`, `contentName`, `contentPiece`, `contentTarget`): `void`

Tracks manual content interaction event

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `contentInteraction` | `string` | Type of interaction (e.g. "click") |
| `contentName` | `string` | Name of a content block |
| `contentPiece` | `string` | Name of the content that was displayed (e.g. link to an image) |
| `contentTarget` | `string` | Where the content leads to (e.g. URL of some external website) |

##### Returns

`void`

***

#### trackContentInteractionNode()

> **trackContentInteractionNode**(`domNode`, `contentInteraction`?): `void`

Tracks interaction with a block in domNode. Can be called from code placed in onclick attribute

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `domNode` | `Node` | Node marked as content block or containing content blocks. If content block can’t be found, nothing will tracked. |
| `contentInteraction`? | `string` | Name of interaction (e.g. "click") |

##### Returns

`void`

***

#### trackVisibleContentImpressions()

> **trackVisibleContentImpressions**(`checkOnScroll`?, `watchInterval`?): `void`

Scans DOM for all visible content blocks and tracks impressions

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `checkOnScroll`? | `boolean` | Whether to scan for visible content on scroll event |
| `watchInterval`? | `number` | Delay, in milliseconds, between scans for new visible content. Periodic checks can be disabled by passing 0 |

##### Returns

`void`


<a name="namespacescookiemanagementmd"></a>

## CookieManagement

### Functions

#### deleteCookies()

> **deleteCookies**(): `void`

Deletes existing tracking cookies on the next page view

##### Returns

`void`

***

#### disableCookies()

> **disableCookies**(): `void`

Disables all first party cookies. Existing cookies will be deleted in the next page view

##### Returns

`void`

***

#### enableCookies()

> **enableCookies**(): `void`

Enables all first party cookies. Cookies will be created on the next tracking request

##### Returns

`void`

***

#### getConfigVisitorCookieTimeout()

> **getConfigVisitorCookieTimeout**(): `Promise`\<`number`\>

Returns expiration time of visitor cookies (in milliseconds)

##### Returns

`Promise`\<`number`\>

***

#### getCookieDomain()

> **getCookieDomain**(): `Promise`\<`string`\>

Returns domain of the analytics tracking cookies (set with setCookieDomain()).

##### Returns

`Promise`\<`string`\>

***

#### getCookiePath()

> **getCookiePath**(): `Promise`\<`string`\>

Returns the analytics tracking cookies path

##### Returns

`Promise`\<`string`\>

***

#### getSessionCookieTimeout()

> **getSessionCookieTimeout**(): `Promise`\<`number`\>

Returns expiration time of session cookies

##### Returns

`Promise`\<`number`\>

***

#### hasCookies()

> **hasCookies**(): `Promise`\<`boolean`\>

Returns true if cookies are enabled in this browser

##### Returns

`Promise`\<`boolean`\>

***

#### setCookieDomain()

> **setCookieDomain**(`domain`): `void`

Sets the domain for the analytics tracking cookies

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `domain` | `string` |

##### Returns

`void`

***

#### setCookieNamePrefix()

> **setCookieNamePrefix**(`prefix`): `void`

Sets the prefix for analytics tracking cookies. Default is "_pk_".

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `prefix` | `string` |

##### Returns

`void`

***

#### setCookiePath()

> **setCookiePath**(`path`): `void`

Sets the analytics tracking cookies path

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `path` | `string` |

##### Returns

`void`

***

#### setReferralCookieTimeout()

> **setReferralCookieTimeout**(`seconds`): `void`

Sets the expiration time of referral cookies

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `seconds` | `number` |

##### Returns

`void`

***

#### setSecureCookie()

> **setSecureCookie**(`secure`): `void`

Toggles the secure cookie flag on all first party cookies (if you are using HTTPS)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `secure` | `boolean` |

##### Returns

`void`

***

#### setSessionCookieTimeout()

> **setSessionCookieTimeout**(`seconds`): `void`

Sets the expiration time of session cookies

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `seconds` | `number` |

##### Returns

`void`

***

#### setVisitorCookieTimeout()

> **setVisitorCookieTimeout**(`seconds`): `void`

Sets the expiration time of visitor cookies

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `seconds` | `number` |

##### Returns

`void`

***

#### setVisitorIdCookie()

> **setVisitorIdCookie**(): `void`

Sets cookie containing [analytics ID](https://developers.piwik.pro/en/latest/glossary.html#term-analytics-id) in browser

##### Returns

`void`


<a name="namespacescrossdomaintrackingmd"></a>

## CrossDomainTracking

### Type Aliases

#### LinkDecorator()

> **LinkDecorator**: (`url`, `value`, `name`) => `string` \| `null`

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `url` | `string` |
| `value` | `string` |
| `name` | `string` |

##### Returns

`string` \| `null`

***

#### VisitorIdGetter()

> **VisitorIdGetter**: (`url`, `name`) => `string`

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `url` | `string` |
| `name` | `string` |

##### Returns

`string`

### Functions

#### customCrossDomainLinkDecorator()

> **customCrossDomainLinkDecorator**(`decorator`): `void`

Sets custom cross domains URL decorator for injecting visitor ID into URLs. Used when cross domain linking is enabled.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `decorator` | [`LinkDecorator`](#linkdecorator) |

##### Returns

`void`

***

#### customCrossDomainLinkVisitorIdGetter()

> **customCrossDomainLinkVisitorIdGetter**(`getter`): `void`

Sets custom cross domain URL parser for extracting visitor ID from URLs. Should extract data injected by URL decorator. The getter should return visitor ID extracted from page URL.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `getter` | [`VisitorIdGetter`](#visitoridgetter) |

##### Returns

`void`

***

#### disableCrossDomainLinking()

> **disableCrossDomainLinking**(): `void`

Disables cross domain linking.

##### Returns

`void`

***

#### enableCrossDomainLinking()

> **enableCrossDomainLinking**(): `void`

Enables cross domain linking. Visitors across domains configured with "setDomains" function will be linked by passing visitor ID parameter in links.

##### Returns

`void`

***

#### getCrossDomainLinkingUrlParameter()

> **getCrossDomainLinkingUrlParameter**(): `Promise`\<`string`\>

Returns the name of a cross domain URL parameter (query parameter by default) holding visitor ID. This is "pk_vid" by default.

##### Returns

`Promise`\<`string`\>

***

#### isCrossDomainLinkingEnabled()

> **isCrossDomainLinkingEnabled**(): `Promise`\<`boolean`\>

Returns boolean telling whether cross domain linking is enabled.

##### Returns

`Promise`\<`boolean`\>

***

#### setCrossDomainLinkingTimeout()

> **setCrossDomainLinkingTimeout**(`timeout`): `void`

Changes the time in which two visits across domains will be linked. The default timeout is 180 seconds (3 minutes).

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `timeout` | `number` |

##### Returns

`void`


<a name="namespacescustomdimensionsmd"></a>

## CustomDimensions

### Functions

#### deleteCustomDimension()

> **deleteCustomDimension**(`customDimensionId`): `void`

Removes a custom dimension with the specified ID.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `customDimensionId` | `string` \| `number` |

##### Returns

`void`

***

#### getCustomDimensionValue()

> **getCustomDimensionValue**(`customDimensionId`): `Promise`\<`string` \| `undefined`\>

Returns the value of a custom dimension with the specified ID.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `customDimensionId` | `string` \| `number` |

##### Returns

`Promise`\<`string` \| `undefined`\>

***

#### setCustomDimensionValue()

> **setCustomDimensionValue**(`customDimensionId`, `customDimensionValue`): `void`

Sets a custom dimension value to be used later.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `customDimensionId` | `string` \| `number` |
| `customDimensionValue` | `string` |

##### Returns

`void`


<a name="namespacescustomeventmd"></a>

## CustomEvent

### Functions

#### trackEvent()

> **trackEvent**(`category`, `action`, `name`?, `value`?, `dimensions`?): `void`

Tracks a custom event, e.g. when a visitor interacts with the page

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `category` | `string` |
| `action` | `string` |
| `name`? | `string` |
| `value`? | `number` |
| `dimensions`? | [`Dimensions`](#dimensions) |

##### Returns

`void`


<a name="namespacesdatalayermd"></a>

## DataLayer

### Type Aliases

#### DataLayerEntry

> **DataLayerEntry**: `Record`\<`string`, `AnyData`\>

### Functions

#### push()

> **push**(`data`): `number`

Adds entry to a data layer

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`DataLayerEntry`](#datalayerentry) |

##### Returns

`number`

***

#### setDataLayerName()

> **setDataLayerName**(`name`): `void`

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |

##### Returns

`void`


<a name="namespacesdownloadandoutlinkmd"></a>

## DownloadAndOutlink

### Functions

#### addDownloadClasses()

> **addDownloadClasses**(`classes`): `void`

Adds new classes to the download classes list

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `classes` | `string`[] |

##### Returns

`void`

***

#### addDownloadExtensions()

> **addDownloadExtensions**(`extensions`): `void`

Adds new extensions to the download extensions list

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `extensions` | `string`[] |

##### Returns

`void`

***

#### enableLinkTracking()

> **enableLinkTracking**(`trackAlsoMiddleAndRightClicks`?): `void`

Enables automatic link tracking. If called with `true`, left, right and
middle clicks on links will be treated as opening a link. Opening a links to
an external site (different domain) creates an outlink event. Opening a link
to a downloadable file creates a download event

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `trackAlsoMiddleAndRightClicks`? | `boolean` |

##### Returns

`void`

***

#### getDownloadClasses()

> **getDownloadClasses**(): `Promise`\<`string`[]\>

Returns list of download classes (CSS classes that indicate a link is a download)

##### Returns

`Promise`\<`string`[]\>

***

#### getLinkTrackingTimer()

> **getLinkTrackingTimer**(): `Promise`\<`number`\>

Returns lock/wait time after a request set by setLinkTrackingTimer

##### Returns

`Promise`\<`number`\>

***

#### removeDownloadClasses()

> **removeDownloadClasses**(`classes`): `void`

Removes classes from the download classes list

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `classes` | `string`[] |

##### Returns

`void`

***

#### removeDownloadExtensions()

> **removeDownloadExtensions**(`extensions`): `void`

Removes extensions from the download extensions list

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `extensions` | `string`[] |

##### Returns

`void`

***

#### setDownloadClasses()

> **setDownloadClasses**(`classes`): `void`

Sets a list of class names that indicate whether a list is a download and not an outlink

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `classes` | `string`[] |

##### Returns

`void`

***

#### setDownloadExtensions()

> **setDownloadExtensions**(`extensions`): `void`

Overwrites the list of file extensions indicating that a link is a download

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `extensions` | `string`[] |

##### Returns

`void`

***

#### setIgnoreClasses()

> **setIgnoreClasses**(`classes`): `void`

Set a list of class names that indicate a link should not be tracked

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `classes` | `string`[] |

##### Returns

`void`

***

#### setLinkClasses()

> **setLinkClasses**(`classes`): `void`

Sets a list of class names that indicate whether a link is an outlink and not download

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `classes` | `string`[] |

##### Returns

`void`

***

#### setLinkTrackingTimer()

> **setLinkTrackingTimer**(`time`): `void`

When a visitor produces an events and closes the page immediately afterwards,
e.g. when opening a link, the request might get cancelled. To avoid loosing
the last event this way, JavaScript Tracking Client will lock the page for a
fraction of a second (if wait time hasn’t passed), giving the request time to
reach the Collecting & Processing Pipeline

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `time` | `number` |

##### Returns

`void`

***

#### trackLink()

> **trackLink**(`url`, `linkType`, `dimensions`?, `callback`?): `void`

Manually tracks outlink or download event with provided values

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `url` | `string` |
| `linkType` | `string` |
| `dimensions`? | [`Dimensions`](#dimensions) |
| `callback`? | () => `void` |

##### Returns

`void`


<a name="namespaceserrortrackingmd"></a>

## ErrorTracking

### Functions

#### enableJSErrorTracking()

> **enableJSErrorTracking**(`unique`?): `void`

Enables tracking of unhandled JavaScript errors.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `unique`? | `boolean` | track only unique errors |

##### Returns

`void`

***

#### trackError()

> **trackError**(`error`): `void`

Attempts to send error tracking request using same format as native errors caught by enableJSErrorTracking().
Such error request will still follow rules set for tracker, so it will be sent only when JS error tracking is enabled
([enableJSErrorTracking](#enablejserrortracking) function was called before this attempt). It will also respect rules for tracking only unique errors.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `Error` |

##### Returns

`void`


<a name="namespacesgoalconversionsmd"></a>

## GoalConversions

### Functions

#### trackGoal()

> **trackGoal**(`goalId`, `conversionValue`, `dimensions`?, `options`?): `void`

Tracks manual goal conversion

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `goalId` | `string` \| `number` |
| `conversionValue` | `number` |
| `dimensions`? | [`Dimensions`](#dimensions) |
| `options`? | [`EcommerceOptions`](#ecommerceoptions) |

##### Returns

`void`


<a name="namespacesheartbeatmd"></a>

## Heartbeat

### Functions

#### disableHeartBeatTimer()

> **disableHeartBeatTimer**(): `void`

Disables sending heartbeats if they were previously enabled by "enableHeartBeatTimer" function.

##### Returns

`void`

***

#### enableHeartBeatTimer()

> **enableHeartBeatTimer**(`delays`?): `void`

When a visitor is not producing any events (e.g. because they are reading an article or watching a video), we don’t know if they are still on the page. This might skew page statistics, e.g. time on page value. Heartbeat timer allows us to determine how much time visitors spend on a page by sending heartbeats to the Tracker as long as the page is in focus.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `delays`? | `number`[] |

##### Returns

`void`


<a name="namespacesmiscellaneousmd"></a>

## Miscellaneous

### Functions

#### setTrackingSourceProvider()

> **setTrackingSourceProvider**(`provider`, `version`): `void`

Adds metadata about used framework

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `provider` | `string` |
| `version` | `string` |

##### Returns

`void`


<a name="namespacespageviewsmd"></a>

## PageViews

### Functions

#### trackPageView()

> **trackPageView**(`customPageTitle`?): `void`

Tracks a visit on the page that the function was run on

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `customPageTitle`? | `string` |

##### Returns

`void`


<a name="namespacessitesearchmd"></a>

## SiteSearch

### Functions

#### trackSiteSearch()

> **trackSiteSearch**(`keyword`, `category`?, `searchCount`?, `dimensions`?): `void`

Tracks search requests on a website

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `keyword` | `string` |
| `category`? | `string` |
| `searchCount`? | `number` |
| `dimensions`? | [`Dimensions`](#dimensions) |

##### Returns

`void`


<a name="namespacesusermanagementmd"></a>

## UserManagement

### Functions

#### deanonymizeUser()

> **deanonymizeUser**(): `void`

Disables anonymous tracking and sends deanonymization event to the Tracker. Recommended method for disabling anonymous tracking.

##### Returns

`void`

***

#### getUserId()

> **getUserId**(): `Promise`\<`string`\>

The function that will return user ID

##### Returns

`Promise`\<`string`\>

***

#### getVisitorId()

> **getVisitorId**(): `Promise`\<`string`\>

Returns 16-character hex ID of the visitor

##### Returns

`Promise`\<`string`\>

***

#### getVisitorInfo()

> **getVisitorInfo**(): `Promise`\<[`VisitorInfo`](#visitorinfo)\>

Returns visitor information in an array

##### Returns

`Promise`\<[`VisitorInfo`](#visitorinfo)\>

***

#### resetUserId()

> **resetUserId**(): `void`

Clears previously set userID, e.g. when visitor logs out

##### Returns

`void`

***

#### setUserId()

> **setUserId**(`userId`): `void`

User ID is an additional parameter that allows you to aggregate data. When
set up, you will be able to search through sessions by this parameter, filter
reports through it or create Multi attribution reports using User ID

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `userId` | `string` |

##### Returns

`void`

***

#### setUserIsAnonymous()

> **setUserIsAnonymous**(`isAnonymous`): `void`

Enables or disables anonymous tracking (anonymous = without consent). The next emitted event will have anonymous mode set accordingly.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `isAnonymous` | `boolean` |

##### Returns

`void`


<a name="namespacesecommercemd"></a>

## eCommerce

### Functions

#### ~~addEcommerceItem()~~

> **addEcommerceItem**(`productSKU`, `productName`, `productCategory`, `productPrice`, `productQuantity`): `void`

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `productSKU` | `string` |
| `productName` | `string` |
| `productCategory` | `string` \| `string`[] |
| `productPrice` | `number` |
| `productQuantity` | `number` |

##### Returns

`void`

##### Deprecated

Please use the ecommerceAddToCart instead.

***

#### ~~clearEcommerceCart()~~

> **clearEcommerceCart**(): `void`

##### Returns

`void`

##### Deprecated

***

#### ecommerceAddToCart()

> **ecommerceAddToCart**(`products`, `options`?): `void`

Tracks action of adding products to a cart

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `products` | [`Product`](#product)[] |
| `options`? | [`EcommerceOptions`](#ecommerceoptions) |

##### Returns

`void`

***

#### ecommerceCartUpdate()

> **ecommerceCartUpdate**(`products`, `grandTotal`, `options`?): `void`

Tracks current state of a cart

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `products` | [`Product`](#product)[] |
| `grandTotal` | `string` \| `number` |
| `options`? | [`EcommerceOptions`](#ecommerceoptions) |

##### Returns

`void`

***

#### ecommerceOrder()

> **ecommerceOrder**(`products`, `paymentInformation`, `options`?): `void`

Tracks conversion, including products and payment details

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `products` | [`Product`](#product)[] |
| `paymentInformation` | [`PaymentInformation`](#paymentinformation) |
| `options`? | [`EcommerceOptions`](#ecommerceoptions) |

##### Returns

`void`

***

#### ecommerceProductDetailView()

> **ecommerceProductDetailView**(`products`, `options`?): `void`

Tracks action of viewing product page

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `products` | [`Product`](#product)[] |
| `options`? | [`EcommerceOptions`](#ecommerceoptions) |

##### Returns

`void`

***

#### ecommerceRemoveFromCart()

> **ecommerceRemoveFromCart**(`products`, `options`?): `void`

Tracks action of removing a products from a cart

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `products` | [`Product`](#product)[] |
| `options`? | [`EcommerceOptions`](#ecommerceoptions) |

##### Returns

`void`

***

#### ~~getEcommerceItems()~~

> **getEcommerceItems**(): `Promise`\<`object`\>

##### Returns

`Promise`\<`object`\>

##### Deprecated

***

#### ~~removeEcommerceItem()~~

> **removeEcommerceItem**(`productSKU`): `void`

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `productSKU` | `string` |

##### Returns

`void`

##### Deprecated

Please use the ecommerceRemoveFromCart instead.

***

#### ~~setEcommerceView()~~

> **setEcommerceView**(`productSKU`, `productName`?, `productCategory`?, `productPrice`?): `void`

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `productSKU` | `string` |
| `productName`? | `string` |
| `productCategory`? | `string`[] |
| `productPrice`? | `string` |

##### Returns

`void`

##### Deprecated

***

#### ~~trackEcommerceCartUpdate()~~

> **trackEcommerceCartUpdate**(`cartAmount`): `void`

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `cartAmount` | `number` |

##### Returns

`void`

##### Deprecated

Please use the ecommerceCartUpdate instead.

***

#### ~~trackEcommerceOrder()~~

> **trackEcommerceOrder**(`orderId`, `orderGrandTotal`, `orderSubTotal`?, `orderTax`?, `orderShipping`?, `orderDiscount`?): `void`

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `orderId` | `string` |
| `orderGrandTotal` | `number` |
| `orderSubTotal`? | `number` |
| `orderTax`? | `number` |
| `orderShipping`? | `number` |
| `orderDiscount`? | `number` |

##### Returns

`void`

##### Deprecated

Please use the ecommerceOrder instead.
