<script setup lang="ts">
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const props = defineProps<{
  id: string;
}>();

const delManga = async () => {
  if (confirm("Are you sure?") == false) return;

  await axios.delete("/manga/delete", {
    data: { id: props.id },
    withCredentials: true,
  });

  router.push("/");
};
</script>

<template>
  <button v-if="store.state.user.permissions?.includes('DELETE')" @click="delManga">Delete</button>
</template>
