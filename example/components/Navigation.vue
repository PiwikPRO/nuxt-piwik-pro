<script setup lang="ts">
const links = [
  { label: "Content Tracking", to: "/content-tracking" },
  { label: "Cookie Management", to: "/cookie-management" },
  { label: "Custom Dimensions", to: "/custom-dimensions" },
  { label: "Custom Events", to: "/custom-events" },
  { label: "Download and Outlink", to: "/download-and-outlink" },
  { label: "E-commerce", to: "/ecommerce" },
  { label: "Goal Conversion", to: "/goal-conversion" },
  { label: "Page Views", to: "/page-views" },
  { label: "Site Search", to: "/site-search" },
  { label: "User Management", to: "/user-management" },
];
</script>

<template>
  <nav class="nav-list">
    <NuxtLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="nav-link"
    >
      {{ link.label }}
    </NuxtLink>
  </nav>
</template>

<style scoped>
.nav-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nav-link {
  display: block;
  padding: 8px 12px;
  border-radius: 6px;
  text-decoration: none;
  color: #374151;
  font-size: 15px;
}
.nav-link:hover {
  background: #f3f4f6;
  color: #111827;
  text-decoration: none;
}
.nav-link.router-link-active {
  background: #f3f4f6;
  color: #111827;
  font-weight: 500;
}
</style>
