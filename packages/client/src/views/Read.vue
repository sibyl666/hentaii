<script setup lang="ts">;
import axios from 'axios';
import { computed, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Manga } from '../types';

const route = useRoute();
const router = useRouter();
const props = defineProps<{
  id: string,
  page: string,
  count?: string
}>();

const currentPage = ref(Number(props.page));
const pageCount = ref(Number(props.count));
const imgSrc = computed(() => 
  `${import.meta.env.VITE_IMG_BASE_URL}/${props.id}/${currentPage.value.toString().padStart(3, "0")}.jpg`
)

if (!pageCount.value) {
  const resp = await axios.get<Manga>("/manga/get", {
    params: { id: props.id }
  });

  pageCount.value = resp.data.count;
}

const toLeft = () => {
  if (currentPage.value <= 1) return;

  currentPage.value--;
  router.push({ name: "Read", params: {
    id: props.id,
    page: currentPage.value,
    count: pageCount.value
  }})
}

const toRight = () => {
  if (currentPage.value >= pageCount.value) return;

  currentPage.value++;
  router.push({ name: "Read", params: {
    id: props.id,
    page: currentPage.value,
    count: pageCount.value
  }})
}

watch(() => route.params.page, () => {
  if (!route.params.page) return;
  
  currentPage.value = Number(route.params.page);
})
</script>


<template>
  <div class="flex flex-col items-center gap-2">
    <div class="max-w-5xl relative">
      <div class="absolute inset-0 flex">
        <div @click="toLeft" class="flex-1" />
        <div @click="toRight" class="flex-1" />
      </div>
      <img class="w-full rounded" :src="imgSrc" :key="currentPage" />
    </div>
  </div>
</template>
