<script setup lang="ts">;
import axios from "axios";
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Manga } from "@hentaii/shared";

const props = defineProps<{
  id: string,
  page: string,
  count?: string 
}>();

const route = useRoute();
const router = useRouter();
const currentPage = ref(Number(props.page));
const totalPage = ref(Number(props.count));

const imgSrc = computed(() => 
  `${import.meta.env.VITE_IMG_BASE_URL}/${props.id}/${currentPage.value.toString().padStart(3, "0")}.jpg`
)

if (!totalPage.value) {
  const resp = await axios.get<Manga>("/manga/get", {
    params: { id: props.id }
  });

  totalPage.value = resp.data.count;
}

const toLeft = () => {
  if (currentPage.value <= 1) return;

  currentPage.value--;
}

const toRight = () => {
  if (currentPage.value >= totalPage.value) return;

  currentPage.value++;
}

watch(currentPage, () => {
  history.pushState(
    {},
    "",
    `${import.meta.env.VITE_BASE_URL}/manga/${route.params.id}/${currentPage.value}`
  )
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
