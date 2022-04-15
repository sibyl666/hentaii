<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const files = ref<FileList>();
const title = ref<string>();
const percent = ref<number>(0);

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;

  files.value = target.files;
}

const upload = async () => {
  if (!files.value || !title.value) return;

  const formData = new FormData();
  Array.from(files.value).forEach(file => {
    formData.append("file", file);
  })

  try {
    await axios.post("/manga/upload", formData, {
      params: {
        title: title.value
      },
      withCredentials: true,
      onUploadProgress: (event) => {
        percent.value = Math.round((event.loaded * 100) / event.total);
      }
    })
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="flex flex-col gap-3 items-center">
    <div class="max-w-5xl w-full flex flex-col gap-4">
      <div class="flex gap-2 flex-col md:flex-row justify-center">
        <input type="file" class="
          file:bg-rose-500 file:hover:bg-rose-600 file:transition-all 
          file:border-none 
          file:rounded-full 
          file:py-2 file:px-4 
          file:text-white
          file:mr-4 text-last-center" multiple accept=".png,.jpg"
          @change="handleChange"/>

        <div class="flex gap-2 flex-1">
          <input v-model="title" type="text" placeholder="Title" 
            class="ib-padding input flex-1">
          <button @click="upload">Upload</button>
        </div>
      </div>

      <div class="flex items-center">
        <p class="w-14 text-center">{{ percent }}%</p>
        <div class="bg-red-500 h-1 rounded-full" :style="{ width: `${percent}%` }"></div>
      </div>
    </div>
  </div>
</template>
