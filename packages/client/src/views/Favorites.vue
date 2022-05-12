<script setup lang="ts">
import axios from "axios"
import Pages from "../components/Pages.vue";
import MangaCover from "../components/MangaCover.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Manga } from "@hentaii/shared";

const route = useRoute();
const mangas = ref<Manga[]>([]);

const resp = await axios.get<Manga[]>("/manga/favorites", {
  params: {
    page: route.query.page || 1
  },
  withCredentials: true
});

mangas.value = resp.data;
</script>

<template>
  <div v-if="mangas.length > 0" class="flex flex-col items-center gap-4">
    <Pages to="Favorites" :totalCount="mangas?.length" />
    <div class="flex flex-wrap justify-center gap-2 max-w-7xl">
      <MangaCover v-for="manga in mangas" :key="manga.id" :manga="manga" />
    </div>
    <Pages to="Favorites" :totalCount="mangas?.length" />
  </div>

  <p v-else class="text-center">It's empty here!</p>
</template>
