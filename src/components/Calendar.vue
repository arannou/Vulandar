<script setup lang="ts">
import { ref } from 'vue'
import moment from 'moment';
import Month from './Month.vue'

// #####################################
// DATA
// #####################################

const currentYear = ref<number>(moment().year())
const currentMonth = ref<number>(moment().month())

const monthList = [...Array(12).keys()];

// #####################################
// METHODS
// #####################################
const goPrevious = () => {
    if (currentMonth.value == 0 ) {
        // go to previous year
        currentMonth.value = 11;
        currentYear.value = currentYear.value - 1
    } else {
        currentMonth.value = currentMonth.value - 1
    }
}
const goNext = () => {
    if (currentMonth.value == 11 ) {
        // go to next year
        currentMonth.value = 0;
        currentYear.value = currentYear.value + 1
    } else {
        currentMonth.value = currentMonth.value + 1
    }
}

const goToday = () => {
    currentYear.value = moment().year()
    currentMonth.value = moment().month()
}
</script>

<template>
    <div class="jump"> 
        <label for="year">Change Year</label>
        <input type="number" name="year" v-model="currentYear">
        <label for="month">Change Month</label>
        <select name="month" v-model="currentMonth">
            <option v-for="month in  monthList" :value="month">{{ moment().month(month).format("MMMM") }}</option>
        </select>
        <button type="button" title="Display current month" @click="goToday()">Today</button>
    </div>

    <Month :month="currentMonth" :year="currentYear" @goNext="goNext" @goPrevious="goPrevious"></Month>


</template>
<style>
.jump {
    margin: 1rem;
    border-radius: 10px;
    padding: 1rem;
    background-color: #b5c5f567
}
.jump label {
    display: inline-block;
}
.jump input {
    width: 3rem;

}
.jump input, .jump select {
    margin: 0 2rem 0 10px;
}
</style>