<script setup lang="ts">
import LoginForm from '../components/Form/FormLogin.vue';
import RegisterForm from '../components/Form/FormRegister.vue';
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center gap-20 md:flex-row">
    <LoginForm />
    <RegisterForm />
  </div>
</template>
