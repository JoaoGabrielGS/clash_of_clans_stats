<script setup lang="ts">
import { FindClans } from "../_services/clash_api";

const clans = ref([]);
const nextCursor = ref<string | undefined>(undefined);
const beforeCursor = ref<string | undefined>(undefined);
const isLoading = ref(false);

const route = useRoute("/clans");

async function loadClans() {
  isLoading.value = true;
  try {
    const response = await FindClans(
      "clans",
      { name: String(route.query.name) },
      10,
      nextCursor.value,
      beforeCursor.value
    );

    if (response.items) {
      clans.value = response.items;
    }

    nextCursor.value = response.paging?.cursors?.after || null;
    beforeCursor.value = response.paging?.cursors?.before || null;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  loadClans();
});

function loadNextPage() {
  if (nextCursor.value) {
    beforeCursor.value = undefined;
    loadClans();
  }
}

function loadPreviousPage() {
  if (beforeCursor.value) {
    nextCursor.value = undefined;
    loadClans();
  }
}
</script>

<template>
  <div
    class="h-full w-full flex flex-col items-center justify-center bg-[url('/src/assets/background-clans.jpg')] bg-cover bg-center overflow-hidden py-12 px-12"
  >
    <div
      class="bg-dark rounded-2 flex gap-4 flex max-w-500 pa-6 h-full text-light overflow-hidden"
    >
      <div class="flex flex-col max-w-max h-full overflow-y-auto gap-2">
        <div
          v-if="isLoading"
          class="h-full w-full flex items-center justify-center gap-6"
        >
          <span class="text-5">Carregando</span>
          <span
            class="pi pi-spin pi-spinner"
            style="font-size: 2rem; color: var(--color-light)"
          />
        </div>
        <template v-else>
          <template v-for="clan in clans" :key="clan.tag">
            <AppCard
              class="flex items-center gap-4 cursor-pointer hover:opacity-60"
            >
              <img
                :src="clan.badgeUrls.small"
                alt="clan badge"
                class="w-10 h-auto"
              />
              <span class="uppercase">{{ clan.name }}</span>
            </AppCard>
          </template>
          <div>
              <AppBtn v-if="nextCursor" color="success" class="mx-auto my-4" @click="loadNextPage">Próxima</AppBtn>
              <AppBtn v-if="nextCursor" color="primary" class="mx-auto" @click="loadPreviousPage">Anterior</AppBtn>
          </div>
        </template>
      </div>
      <div class="flex-1 bg-red">oi</div>
    </div>
  </div>
</template>

<style>
</style>
