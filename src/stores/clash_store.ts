import { defineStore } from 'pinia';
import { FindClanByTag, FindClans } from '../_services/clash_api';

export const useClashStore = defineStore('clash', {
  state: () => ({
    clans: [] as any[],
    clan: undefined as undefined | any,
    nextCursor: null as string | null,
    beforeCursor: null as string | null,
  }),

  actions: {
    async getClansByName(name: string, cursorAfter?: string, cursorBefore?: string) {
      try {
        const response = await FindClans('clans', { name }, 10, cursorAfter, cursorBefore);

        this.clans = response.items || [];
        this.nextCursor = response.paging?.cursors?.after || null;
        this.beforeCursor = response.paging?.cursors?.before || null;
      } catch (error) {
        console.error('Erro ao buscar clãs:', error);
      }
    },

    async getClansByTag(tag: string) {
      try {
        const response = await FindClanByTag(tag);

        this.clan = response;
      } catch (error) {
        console.error(`Não foi encontrado o clã com a tag: "${tag}"`, error);
      }
    },
  },
});
