<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
defineProps<{
  modelValue: any
}>();
const emit = defineEmits(["update:modelValue"]);

const handleEmit = (event: Event) => {
  let target = event.target as HTMLInputElement;

  emit("update:modelValue", target.value);
}
</script>

<template>
  <div class="flex flex-col rounded overflow-hidden relative">
    <input type="text" v-bind="$attrs" class="input ib-padding peer" :value="modelValue" @input="handleEmit" />
    <div class="transition-all absolute bottom-0 h-0.5 w-0 peer-focus:w-full bg-rose-500" />
  </div>
</template>
