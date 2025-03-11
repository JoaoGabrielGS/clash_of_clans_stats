<script setup lang="ts">

defineProps({
  placeholder: {
    type: String,
    default: 'Pesquisar...',
  }
})

const modelValue = defineModel<String>({ required: true });

const handleBlur = (event: Event) => {
  modelValue.value = (event.target as HTMLInputElement).value;
};

const handleEnter = (event: KeyboardEvent) => {
  modelValue.value = (event.target as HTMLInputElement).value;
};
</script>

<template>
  <input 
    type="text" 
    class="w-full h-10 bg-dark text-light rounded-1 px-4 border-1 b-primary" 
    :placeholder="placeholder"
    :value="modelValue"
    @blur="handleBlur"
    @keydown.enter="handleEnter"
  />
</template>

<style>
* {
  font-family: 'Montserrat', sans-serif;
}
</style>
