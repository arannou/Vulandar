<script setup lang="ts">
import { ref } from 'vue'
import moment from 'moment';
import Month from './Month.vue'


const currentYear = ref<number>(moment().year())
const currentMonth = ref<number>(moment().month())

const monthList = [...Array(12).keys()];

const goPrevious= () => {
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
</script>

<template>
    <div>
        <label for="year">Change Year</label>
        <input type="number" name="year" v-model="currentYear">
    </div>
    <div>
        <label for="month">Change Month</label>
        <select name="month" v-model="currentMonth">
            <option v-for="month in  monthList" :value="month">{{ moment().month(month).format("MMMM") }}</option>
        </select>
    </div>

    <Month :month="currentMonth" :year="currentYear" @goNext="goNext" @goPrevious="goPrevious"></Month>


</template>
