<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment';

import Day from './Day.vue'


const props = defineProps({
  month: { type: Number, default: 0 },
  year: { type: Number, default: moment().year() },
})


const emit = defineEmits([])

const daysList = computed(() => {
    const daysInMonth = moment({ year: props.year, month: props.month }).daysInMonth()
    return [...Array(daysInMonth).keys()]
})

</script>

<template>
    <div class="month-component">
        <h2>{{ moment().month(props.month).format("MMMM") }}</h2>

        <div class="days-container" >
            <Day v-for="day of daysList" :key="day" :day="day" :year="year" :month="month"></Day>
        </div>

    </div>
</template>
