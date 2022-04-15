<script setup lang="ts">
import { ref } from 'vue';
import AppInput from '../Input.vue';
import axios from 'axios';

const username = ref<string>();
const password = ref<string>();
const errResult = ref<string>();
const registered = ref<boolean>(false);

const register = () => {
  if (!username.value || !password.value) return;

  grecaptcha.ready(async () => {
    const token = await grecaptcha.execute("6LdsBZ0dAAAAAISP61KaSoxkucjSts9Q8v9ASQoK", { action: "submit" });

    try {
      await axios.post("/auth/register", {
        username: username.value,
        password: password.value,
        token
      })

      registered.value = true;
    } catch(err) {
      if (axios.isAxiosError(err)) {
        errResult.value = err.response?.data;
      }
    }
  })
}
</script>

<template>
  <div class="flex flex-col gap-2" v-if="!registered">
    <p>Register</p>
    <div class="flex flex-col justify-center gap-2 max-w-sm mx-auto">
      <AppInput placeholder="username" v-model="username" />
      <AppInput placeholder="password" v-model="password" />
      <button class="transition-colors bg-rose-500 hover:bg-rose-600 ib-padding rounded" @click="register">Register</button>

      <p class="text-center h-0">{{ errResult }}</p>
    </div>
  </div>
</template>