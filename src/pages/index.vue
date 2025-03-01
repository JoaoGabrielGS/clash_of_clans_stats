<script setup lang="ts">
import { fetchClashData } from '../_services/clash_api';

const clanData = ref(null);

onMounted(async () => {
  try {
    clanData.value = await fetchClashData('clans', { name: 'brasil'});
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
    <div class="h-full w-full bg-dark">
        <div class="w-full h-100">
            <img src="/src/assets/background.png" alt="Clash" class="h-full w-full object-cover object-[0_10%]" />
        </div>

        <h1>Informações do Clã</h1>
        <pre v-if="clanData">{{ clanData }}</pre>
    </div>
</template>