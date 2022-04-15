<script setup lang="ts">
import TheLogout from "./TheLogout.vue";
import TheLogin from "./TheLogin.vue";
import TheSearch from "./TheSearch.vue";

import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
const isOpen = ref(false);

const toggleMenu = () => isOpen.value = !isOpen.value;
const toUpload = () => router.push("/upload");
const toFavorites = () => router.push("/favorites");
const toHome = () => router.push("/");
</script>

<template>
  <div class="flex flex-col p-1 gap-2">
    <div class="flex gap-2 items-center">
      <button class="hidden md:flex" v-if="store.state.user.permissions?.includes('UPLOAD')" 
        @click="toUpload">Upload</button>

      <TheSearch />
      <img @click="toggleMenu" src="../assets/menu.svg" class="p-1 bg-red-500 rounded md:hidden">

      <div class="hidden md:flex">
        <TheLogin v-if="!store.state.user.username" />
        <div class="flex gap-2" v-else>
          <button @click="toHome">Home</button>
          <button @click="toFavorites">Favorites</button>
          <div class="bg-zinc-800 rounded w-1 h-full mx-1" />
          <TheLogout />
        </div>
      </div>
    </div>


    <div class="flex flex-col overflow-hidden md:hidden max-h-0 transition-all gap-2" :class="{ 'max-h-96 p-2': isOpen }">
      <button v-if="store.state.user.permissions?.includes('UPLOAD')" 
        @click="toUpload">Upload</button>


      <div class="flex flex-col gap-2" v-if="store.state.user.username">
        <button @click="toFavorites">Favorites</button>
        <TheLogout />
      </div>
      <TheLogin v-else />

      <button @click="toHome">Home</button>
    </div>
  </div>
</template>
