<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import moment from 'moment';

import Day from './Day.vue'
import { Event, useEventStore } from "../store/events"
import Popup from './Popup.vue';
import EventView from './EventView.vue';
import EventCreator from './EventCreator.vue';

const eventStore = useEventStore()

// #####################################
// PROPS / EVENTS
// #####################################
const props = defineProps({
  month: { type: Number, default: 0 },
  year: { type: Number, default: moment().year() },
})

const emit = defineEmits(['goNext', 'goPrevious'])

// #####################################
// DATA
// #####################################
const popupActive = ref<boolean>(false)
const popupTitle = ref<string>("New event")
const selectedDay = ref<number>(0)
const eventsOfDay = ref<Array<Event>>(Array<Event>())
const editionMode = ref<boolean>(false)
const winwidth = ref<number>(window.innerWidth)

// #####################################
// COMPUTED
// #####################################
const daysList = computed(() => {
    const daysInMonth = moment({ year: props.year, month: props.month }).daysInMonth()
    return [...Array(daysInMonth).keys()]
})

const daysOfWeek = computed(() => {
    let dayFomat = 'ddd' // like 'Sun'
    if (winwidth.value > 700) {
        dayFomat = 'dddd' // like 'Sunday'
    }
    return [...Array(7).keys()].map(d => moment().day(d).format(dayFomat))
})

const padding = computed(() => {
    // shift the first day of the month to the right to match the correct weekday
    const firstDayOfMonth = moment({ year: props.year, month: props.month, date:1 })
    return firstDayOfMonth.weekday()
})

const eventsOfMonth = computed((): Event[] => {
    return eventStore.getEventsByMonth(props.year, props.month)
})

// #####################################
// HOOKS
// #####################################
onMounted(() => {
    window.addEventListener('resize', () => {
        // switch to display full day names if the window is wide enough
        winwidth.value = window.innerWidth
    })
})

onUnmounted(() => {
    window.removeEventListener('resize', () => {
        winwidth.value = window.innerWidth
    })
})

// #####################################
// METHODS
// #####################################
const onClickDay = (day: number) => {
    selectedDay.value = day
    eventsOfDay.value = eventsOfMonth.value.filter(e => e.dayOfMonth == day)
    
    popupActive.value = true
    if (eventsOfDay.value.length == 0) {
        // create event
        popupTitle.value = "New event"
        editionMode.value = true
    } else {
        // display events
        popupTitle.value = "Event of the day"
        editionMode.value = false
    }

}


</script>

<template>
    <div class="month-component">
        <Popup v-if="popupActive">
            <template #name>{{ popupTitle }}</template>
            <template #content>
                <template v-if="editionMode">
                    <EventCreator @cancel="popupActive=false" :year="props.year" :month="props.month" :day="selectedDay"></EventCreator>
                </template>
                <template v-else>
                    <EventView v-for="event of eventsOfDay" :existingEvent=event :key="event.name" @cancel="popupActive=false"></EventView>
                </template>
            </template>
        </Popup>
        <div class="month-title">
            <button type="button" class="icon" alt="Go to previous month" title="Previous" @click="emit('goPrevious')"><</button>
            <h2>{{ moment().month(props.month).format("MMMM") }}</h2>
            <button type="button" class="icon" alt="Go to next month" title="Next" @click="emit('goNext')">></button>
        </div>

        <div class="days-container" >
            <h3 v-for="day in daysOfWeek">{{ day }}</h3>
            <span v-for="_ in padding"></span>
            <Day v-for="day of daysList" :key="day" :day="day" :year="year" :month="month" :events="eventsOfMonth" @click="onClickDay(day)"></Day>
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