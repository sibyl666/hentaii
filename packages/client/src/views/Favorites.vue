<script setup lang="ts">
import axios from "axios"
import Pages from "../components/Pages.vue";
import MangaCover from "../components/MangaCover.vue";
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { Manga } from "../types";
const store = useStore();
const route = useRoute();
const mangas = ref<Manga[]>([]);
const favorites = store.state.user.favorites;

const getFavorites = async () => {
  const resp = await axios.get<Manga[]>("/manga/favorites", {
    params: {
      ids: favorites,
      page: route.query.page || 1
    },
    withCredentials: true
  });

  mangas.value = resp.data;
}

if (favorites.length >= 0) {
  await getFavorites();
}

watch(() => route.query.page,() => {
  if (!route.query.page) return;
  getFavorites();
})
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <Pages to="Favorites" :totalCount="favorites?.length" />
    <div class="flex flex-wrap justify-center gap-2 max-w-7xl">
      <MangaCover v-for="manga in mangas" :key="manga.id" :manga="manga" />
    </div>
    <Pages to="Favorites" :totalCount="favorites?.length" />
  </div>

  <p class="text-center" v-if="!mangas">It's empty here!</p>
</template>
