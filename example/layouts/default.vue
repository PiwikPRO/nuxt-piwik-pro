<script setup lang="ts"></script>

<template>
  <div>
    <NavigationMenuDrawer />
    <main class="main-content">
      <slot />
    </main>
    <ToastStack />
  </div>
</template>
