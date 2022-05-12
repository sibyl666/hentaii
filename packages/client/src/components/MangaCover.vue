<script setup lang="ts">
import { Manga } from "@hentaii/shared";
const imgBase = import.meta.env.VITE_IMG_BASE_URL;

defineProps<{
  manga: Manga;
}>();
</script>

<template>
  <router-link
    :to="{ name: 'Manga', params: { id: manga.id, manga: JSON.stringify(manga) } }"
    class="rounded relative  w-[300px] h-[426px] shadow-md hover:shadow-rose-500 transition-all"
  >
    <p class="absolute bottom-0 z-10 m-3 break-all">
      {{ manga.title }}
    </p>

    <img
      loading="lazy"
      :src="`${imgBase}/${manga.id}/001t.jpg`"
      class="object-cover rounded rounded-b-lg w-[300px] h-[426px]"
      width="300"
      height="426"
    />
    <div class="rounded absolute inset-0 bg-gradient-to-t from-black" />
  </router-link>
</template>
