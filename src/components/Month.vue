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

const daysOfWeek = computed(() => {
    return [...Array(7).keys()].map(d => moment().day(d).format('dddd'))
})

const padding = computed(() => {
    const firstDayOfMonth = moment({ year: props.year, month: props.month, date:1 })
    return firstDayOfMonth.weekday()
})


</script>

<template>
    <div class="month-component">
        <div class="month-title">
            <button type="button" class="icon" alt="Go to previous month" title="Previous" @click="emit('goPrevious')"><</button>
            <h2>{{ moment().month(props.month).format("MMMM") }}</h2>
            <button type="button" class="icon" alt="Go to next month" title="Next" @click="emit('goNext')">></button>
        </div>

        <div class="days-container" >
            <h3 v-for="day in daysOfWeek">{{ day }}</h3>
            <span v-for="_ in padding"></span>
            <Day v-for="day of daysList" :key="day" :day="day" :year="year" :month="month"></Day>
        </div>

    </div>
</template>

<style>
.days-container {
    display: grid;
    gap: 5px;
    padding: 10px;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(7, 1fr);
}

.month-title h2 {
    display: inline;
}

.month-title button {
    border-radius: 50%;
    margin: 5px;
    border: none;
    height: 2rem;
    width: 2rem;
    font-weight: bold;
}

.month-title button:hover {
    filter: brightness(120%);
    cursor: pointer;
}

</style>