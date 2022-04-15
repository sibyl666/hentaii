<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const props = defineProps<{
  totalCount: number;
  to: string
}>();

const range = (min: number, max: number) => {
  var list = [];
  for (let index = min; index <= max; index++) {
    list.push(index);
  }

  return list;
};

const total = Math.ceil(props.totalCount / 20);
const currentPage = computed(() => parseInt(route.query.page as string) || 1);

const startPage = computed(() => Math.max(currentPage.value - 3, 1));
const endPage = computed(() => Math.min(currentPage.value + 3, total));
const nums = computed(() => range(startPage.value, endPage.value));

const changePage = (page: number) => {
  router.push({ name: props.to, query: { page } });
};
</script>

<template>
  <div class="flex bg-zinc-800 gap-2 p-1 rounded">
    <div
      v-for="num in nums"
      class="flex justify-center items-center select-none rounded w-10 h-10"
      :class="{ 'bg-rose-500': num == currentPage }"
      @click="changePage(num)"
    >
      {{ num }}
    </div>
  </div>
</template>
