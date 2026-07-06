<script setup lang="ts">
import Calendar from './components/Calendar.vue'
</script>

<template>
  <Calendar />
</template>
<style>
button {
  border: none;
  padding: 10px;
  border-radius: 5px;
}
button:hover {
  filter: brightness(120%);
  cursor: pointer;
}
</style>