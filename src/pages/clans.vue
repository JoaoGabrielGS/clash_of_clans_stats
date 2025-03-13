<script setup lang="ts">
import { useClashStore } from "../stores/clash_store";

const clasStore = useClashStore();
const clans = ref<any[]>([]);
const clan = ref<any>({});
const isLoading = ref(false);
const route = useRoute("/clans");

const nextCursor = computed(() => clasStore.nextCursor);
const beforeCursor = computed(() => clasStore.beforeCursor);

onMounted(async () => {
  await clasStore.getClansByName(String(route.query.name));
  clans.value = clasStore.clans;
});

function loadNextPage() {
  if (clasStore.nextCursor) {
    clasStore.getClansByName(String(route.query.name), clasStore.nextCursor);
    clans.value = clasStore.clans;
  }
}

function loadPreviousPage() {
  if (clasStore.beforeCursor) {
    clasStore.getClansByName(String(route.query.name), clasStore.beforeCursor);
    clans.value = clasStore.clans;
  }
}

async function findClanByTag(selectedClan: any) {
  await clasStore.getClansByTag(selectedClan.tag);
  clan.value = clasStore.clan;
}
</script>

<template>
  <div
    class="h-full w-full flex flex-col items-center justify-center bg-[url('/src/assets/background-clans.jpg')] bg-cover bg-center overflow-hidden py-12 px-12"
  >
    <div
      class="bg-dark rounded-2 flex gap-4 flex max-w-500 pa-6 h-full text-light overflow-hidden"
    >
      <div class="flex flex-col max-w-80 h-full overflow-y-auto gap-2">
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
              @click="findClanByTag(clan)"
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
            <AppBtn
              v-if="nextCursor"
              color="success"
              class="mx-auto my-4"
              @click="loadNextPage"
              >Próxima</AppBtn
            >
            <AppBtn
              v-if="beforeCursor"
              color="primary"
              class="mx-auto"
              @click="loadPreviousPage"
              >Anterior</AppBtn
            >
          </div>
        </template>
      </div>
      <AppCard
        v-if="clan.name"
        class="flex-1 h-full overflow-hidden flex flex-col"
        color="primary"
      >
        <div class="flex-1">
          <div class="flex items-center gap-4 max-h-max">
            <div class="flex-1 flex items-center gap-2 max-h-max">
              <img
                :src="clan.badgeUrls?.small"
                alt="clan badge"
                class="w-20 h-auto"
              />
              <span class="uppercase text-8 underline">{{ clan.name }}</span>
            </div>
            <div class="max-h-max max-w-max">
              <div class="flex max-h-max items-center gap-2 max-w-max mb-2">
                <span
                  class="pi pi-trophy cursor-pointer"
                  style="color: var(--color-gold)"
                  @click="openSearch = false"
                ></span>
                <span>{{ clan.clanPoints }}</span>
              </div>
              <div class="flex max-h-max items-center gap-2 max-w-max">
                <span
                  class="pi pi-users cursor-pointer"
                  style="color: var(--color-gold)"
                  @click="openSearch = false"
                ></span>
                <span>{{ clan.members }}</span>
              </div>
            </div>
          </div>
          <div class="max-h-max max-w-max mt-4">
            <p>
              <span class="font-bold text-success">Descrição:..</span>
              {{ clan.description }}
            </p>
            <p class="mt-4">
              <span class="font-bold text-success">Level:..</span>
              {{ clan.clanLevel }}
            </p>
            <p class="mt-4">
              <span class="font-bold text-success">Linguagem:..</span>
              {{ clan.chatLanguage?.name }}
            </p>
            <p class="mt-4">
              <span class="font-bold text-success"
                >Min Lvl Centro da vila:..</span
              >
              {{ clan.requiredTownhallLevel }}
            </p>
            <p class="mt-4">
              <span class="font-bold text-success">Min Troféus:..</span>
              {{ clan.requiredTrophies }}
            </p>
            <p class="mt-4">
              <span class="font-bold text-success">Liga do Clan:..</span>
              {{ clan.warLeague?.name }}
            </p>
            <p class="mt-4">
              <span class="font-bold text-success">Liga da capital:..</span>
              {{ clan.capitalLeague?.name }}
            </p>
            <p class="mt-4">
              <span class="font-bold text-success">Guerras vencidas:..</span>
              {{ clan.warWins }}
            </p>
            <p class="mt-4">
              <span class="font-bold text-success">Tipo:..</span>
              {{ clan.type }}
            </p>
          </div>
        </div>

        <div class="max-h-max flex justify-center gap-4">
          <AppCard class="max-h-max max-w-max mt-6 cursor-pointer" color="gold"
            >Membros</AppCard
          >
          <AppCard class="max-h-max max-w-max mt-6 cursor-pointer" color="gold"
            >Capital de "{{ clan.name }}"</AppCard
          >
        </div>
      </AppCard>
    </div>
  </div>
</template>

<style></style>
