<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import TheFavoriteButton from "../components/TheFavoriteButton.vue";
import TheDeleteButton from "../components/TheDeleteButton.vue";
import { Manga } from "@hentaii/shared";

const imgBase = import.meta.env.VITE_IMG_BASE_URL;

const router = useRouter();
const route = useRoute();
const props = defineProps<{
  manga?: any;
}>();

const manga = ref();

if (!props.manga) {
  const resp = await axios.get<Manga>("/manga/get", {
    params: {
      id: route.params.id,
    },
  });

  manga.value = resp.data;
} else {
  manga.value = JSON.parse(props.manga)
}

const addPadding = (num: number) => {
  return num.toString().padStart(3, "0");
}

const toRead = (id: string, page: number, count: number) => {
  console.log("xd");
  router.push({ name: "Read", params: { id, page, count } })
  console.log("xe");
}
</script>

<template>
  <div v-if="manga" class="flex flex-col gap-2">
    <div class="overflow-hidden rounded">
      <img :src="`${imgBase}/${manga.id}/001.jpg`" class="h-52 w-full object-cover blur-sm" />
    </div>

    <div class="max-w-5xl mx-auto flex flex-col gap-2">
      <div class="flex flex-col items-start gap-2">
        <p class="text-3xl font-semibold">{{ manga.title }}</p>

        <div class="flex gap-2">
          <TheFavoriteButton :id="manga.id" />
          <TheDeleteButton :id="manga.id" />
        </div>
      </div>

      <div class="flex flex-wrap gap-2 max-w-5xl mx-auto justify-center">
        <img
          v-for="index in manga.count"
          loading="lazy"
          width="1353" height="1920"
          class="object-cover rounded w-80 flex-grow"
          :src="`${imgBase}/${manga.id}/${addPadding(index)}.jpg`"
          @click="toRead(manga.id, index, manga.count)"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading</p>
  </div>
</template>
