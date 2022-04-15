<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const query = ref("");

const handleInput = (event: Event) => {
  let element = event.target as HTMLInputElement;
  query.value = element.value;
}

var queryTimeout: number;
watch(query, () => {
  if (queryTimeout) clearTimeout(queryTimeout);
  if (!query.value.trim()) {
    router.push("/");
    return;
  }

  queryTimeout = window.setTimeout(() => {
    router.push({ name: "Search", query: { q: query.value }});
  }, 1000)
})
</script>

<template>
  <input type="text" placeholder="Search" class="input ib-padding w-full" @input="handleInput" />
</template>
