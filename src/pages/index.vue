<script setup lang="ts">
const openMenu = ref(false);
</script>

<template>
    <div class="h-full w-full flex flex-col items-center justify-center bg-[url('/src/assets/background.png')] bg-cover bg-center overflow-hidden py-6 px-4">
      <div class="bg-dark rounded-2 flex gap-4 flex-col max-w-120 max-h-max pa-6 text-light">
        <p>Este é um projeto de estudo para explorar a API do Clash of Clans. Aqui você pode buscar informações sobre:</p>
          <li><strong>Clãs</strong></li>
          <li><strong>Jogadores</strong></li>
          <li><strong>Ligas</strong></li>
          <li><strong>Rankings</strong></li>
        <p>e muito mais. Experimente acessar os dados e entender como funciona a API! 🚀</p>

        <AppBtn class="mx-auto mt-4" @click="openMenu = !openMenu">Abrir Menu</AppBtn>
      </div>

      <transition name="fade">
        <AppMenu v-if="openMenu" @close-menu="openMenu = false"/>
      </transition>
    </div>
</template>

<style lang="css">
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>