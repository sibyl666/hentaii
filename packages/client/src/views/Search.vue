<script setup lang="ts">
import axios from "axios";
import { watchEffect, ref } from "vue";
import { useRoute } from "vue-router";
import { Manga } from "../types";
import MangaCover from "../components/MangaCover.vue";
const route = useRoute();
const mangas = ref();

watchEffect(async () => {
  if (!route.query.q) return;

  const resp = await axios.get<Manga>("/manga/search", {
    params: { q: route.query.q },
  });
  mangas.value = resp.data;
});

const beforeLeave = (el: Element) => {
  const element = el as HTMLElement;
  const { width, height } = element.getBoundingClientRect();
  
  element.style.top = `${element.offsetTop}px`;
  element.style.left = `${element.offsetLeft}px`;
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
};
</script>

<template>
  <div class="flex justify-center flex-wrap gap-2 max-w-7xl w-full mx-auto relative">
    <transition-group name="manga" mode="out-in" @before-leave="beforeLeave">
      <MangaCover v-for="manga in mangas" :key="manga.id" :manga="manga" />
    </transition-group>
  </div>
</template>

<style>
.manga-move {
  transition: all 1s ease;
}

.manga-enter-active,
.manga-leave-active {
  transition: all 0.3s ease;
}

.manga-leave-active {
  position: absolute;
}

.manga-enter-from,
.manga-leave-to {
  opacity: 0;
}
</style>
