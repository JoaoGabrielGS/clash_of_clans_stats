<script setup lang="ts">
const router = useRouter();

const emit = defineEmits<{
    (name: 'closeMenu'): void;
}>();

const openSearch = ref(false);
const searchInputRef = ref('');
const searchInput = ref('');

async function onSearch() {
    router.push({ name: searchInputRef.value, query: { name: searchInput.value } });
}
</script>

<template>
    <div class="h-full w-full bg-black bg-opacity-50 px-2 absolute flex justify-center items-center">
        <div class="bg-dark max-h-max pa-8 max-w-120 rounded-1 !overflow-hidden flex flex-col">
            <div class="flex justify-center items-start w-full h-auto ">
                <div class="flex-1 flex justify-center items-start ml-2">
                    <img src="/src/assets/supercell.png" alt="Clash" class="!w-45 !h-auto" />
                </div>
                <i class="pi pi-times cursor-pointer max-w-max" style="color: #D72638" @click="emit('closeMenu')"></i>
            </div>
            <div v-if="!openSearch" class="flex flex-col flex-1 my-4 gap-6 items-center">
                <p class="text-center text-light">Escolha sobre o que deseja pesquisar</p>
                <AppBtn @click="searchInputRef = 'clans', openSearch = true">Clans</AppBtn>
                <AppBtn @click="searchInputRef = 'players', openSearch = true">Jogadores</AppBtn>
                <AppBtn @click="searchInputRef = 'leagues', openSearch = true">Ligas</AppBtn>
                <AppBtn @click="searchInputRef = 'rankings', openSearch = true">Rankings</AppBtn>
            </div>
            <div v-else class="max-h-max min-h-50">
                <div class="max-h-max my-6 flex items-center gap-2">
                    <span class="pi pi-arrow-left cursor-pointer" style="color: #CCCCCC" @click="openSearch = false"></span>
                    <h3 v-if="searchInputRef === 'clans'" class="max-h-max text-light">Pesquisar Clans</h3>
                    <h3 v-if="searchInputRef === 'players'" class="max-h-max text-light">Pesquisar Jogadores</h3>
                    <h3 v-if="searchInputRef === 'leagues'" class="max-h-max text-light">Pesquisar Ligas</h3>
                    <h3 v-if="searchInputRef === 'rankings'" class="max-h-max text-light">Pesquisar Rankings</h3>
                </div>
                
                <AppTextInput v-model.lazy="searchInput" placeholder="Digite..."/>

                <AppBtn class="mt-6 mx-auto" @click="onSearch">
                    <template #icon>
                        <span class="pi pi-search mr-2"></span>
                    </template>
                    Pesquisar
                </AppBtn>
            </div>
        </div>
    </div>
</template>