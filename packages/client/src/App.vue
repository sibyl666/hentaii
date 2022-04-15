<script setup lang="ts">
import NavbarVue from "./components/TheNavbar.vue";
import { useStore } from "vuex";
const store = useStore();

if (store.state.user.username) {
  store.dispatch("update");
}
</script>

<template>
  <suspense :timeout="0">
    <router-view v-slot="{ Component, route }">
      <div id="content" class="p-2 flex flex-col gap-2 flex-1">
        <NavbarVue />
        <keep-alive :max="2">
          <component :is="Component" :key="route.path" />
        </keep-alive>
    </div>
    </router-view>

    <template #fallback> Loading... </template>
  </suspense>
</template>

<style>

</style>
