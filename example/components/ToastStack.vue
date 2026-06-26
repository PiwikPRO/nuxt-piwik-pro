<script setup lang="ts">
const { toasts, remove } = useToast();
</script>

<template>
  <div class="toast-stack">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="alert alert-info toast-item"
        @click="remove(toast.id)"
      >
        <span>{{ toast.message }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>
