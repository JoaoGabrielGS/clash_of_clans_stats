<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: "primary",
  },
});
</script>

<template>
  <div
    class="border-2 border-solid border-dark rounded-2 py-4 px-8 cursor-pointer max-w-max max-h-max hover:opacity-80"
    :style="{ backgroundColor: `var(--color-${color})` }"
  >
    <slot name="icon" />
    <slot />
  </div>
</template>
