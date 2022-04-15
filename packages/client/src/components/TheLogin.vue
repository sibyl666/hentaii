<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const login = () => router.push("/login");
</script>

<template>
  <button @click="login">Login</button>
</template>
