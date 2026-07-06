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
    <div>
      <label for="year">Go to</label>
      <select
        v-model="currentMonth"
        name="month"
      >
        <option
          v-for="month in monthList"
          :key="month"
          :value="month"
        >
          {{ moment().month(month).format("MMMM") }}
        </option>
      </select>
      <input
        v-model="currentYear"
        type="number"
        name="year"
      >
    </div>
    <button
      type="button"
      title="Display current month"
      @click="goToday()"
    >
      Today
    </button>
  </div>

  <Month
    :month="currentMonth"
    :year="currentYear"
    @go-next="goNext"
    @go-previous="goPrevious"
  />
</template>
<style>
.jump {
    margin: 1rem;
    border-radius: 10px;
    padding: 1rem;
    background-color: #b5c5f567;
    display: flex;
        flex-wrap: wrap;
    justify-content: center;
    align-items: baseline;
}
.jump label {
    display: inline-block;
    margin-right: .5rem;
}
.jump input {
    width: 3rem;
}
.jump input, .jump select {
    margin: 0 .5rem 0 0;
}

.jump button {
    margin: 5px 2rem;
}
</style>