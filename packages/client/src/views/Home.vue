<script setup lang="ts">
import axios from "axios";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import MangaCover from "../components/MangaCover.vue";
import Pages from "../components/Pages.vue";
import { Manga } from "@hentaii/shared";

const route = useRoute();
const mangas = ref();
const totalCount = ref<number>(0);

const getLatest = async () => {
  const resp = await axios.get<{ data: Manga[], totalCount: number }>("/manga/latest", {
    params: {
      page: route.query.page || 1,
    },
  });

  mangas.value = resp.data.data;
  totalCount.value = resp.data.totalCount;
};

watch(() => route.query.page, () => {
  if (!route.query.page) return;
  getLatest()
});

await getLatest();
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <Pages to="Home" :totalCount="totalCount" />
    <div class="flex flex-wrap justify-center gap-2 max-w-7xl">
      <MangaCover v-for="manga in mangas" :key="manga.id" :manga="manga" />
    </div>
    <Pages to="Home" :totalCount="totalCount" />
  </div>
</template>
