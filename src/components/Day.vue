<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment';


const props = defineProps({
  day: { type: Number, default: 0 },
  month: { type: Number, default: 0 },
  year: { type: Number, default: moment().year() },
})

const emit = defineEmits([])


</script>

<template>
    <div class="day-component">

        <p>{{  props.day + 1 }}</p>
        
    </div>
</template>

<style>
.day-component {
    border: 1px solid #eee;
    height: 4rem;
}
.day-component:hover {
    background-color: #b5c5f567;
    cursor: pointer;
}
</style>