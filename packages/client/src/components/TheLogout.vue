<script setup lang="ts">
import { useStore } from "vuex"
import { useRouter } from "vue-router"
const router = useRouter();
const store = useStore();

const logout = () => {
  store.dispatch("logout");
  router.push("/");
};
</script>

<template>
  <button @click="logout">Logout</button>
</template>
