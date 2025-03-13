<script setup lang="ts">
  defineProps({
    color: {
      type: String,
      default: 'primary' 
    }
  });
</script>

<template>
    <div
      class="border-2 border-solid pa-4 border-t-8 rounded-2 bg-dark"
      :style="{ borderColor: `var(--color-${color})` }" 
    >
        <slot />
    </div>
</template>

<style>
div {
    border-color: var(--color-primary);
}
</style>