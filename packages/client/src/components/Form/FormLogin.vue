<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import AppInput from "../Input.vue";

const router = useRouter();
const store = useStore();

const username = ref<string>();
const password = ref<string>();
const errResult = ref<string>();

const login = () => {
  if (!username.value || !password.value) return;

  grecaptcha.ready(async () => {
    try {
      const token = await grecaptcha.execute("6LdsBZ0dAAAAAISP61KaSoxkucjSts9Q8v9ASQoK", { action: "submit" });

      await store.dispatch("login", {
        username: username.value,
        password: password.value,
        token
      });

      router.push("/");
    } catch(err) {
      if (axios.isAxiosError(err)) {
        errResult.value = err.response?.data;
      }
    }
  })
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <p>Login</p>
    <div class="flex flex-col justify-center gap-2 max-w-sm mx-auto">
      <AppInput placeholder="username" v-model="username" />
      <AppInput placeholder="password" v-model="password" />
      <button class="transition-colors bg-rose-500 hover:bg-rose-600 ib-padding rounded" @click="login">Login</button>

      <p class="text-center h-0">{{ errResult }}</p>
    </div>
  </div>
</template>