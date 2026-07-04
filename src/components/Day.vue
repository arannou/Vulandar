<script setup lang="ts">
import moment from 'moment';
import { computed } from 'vue';
import { Event as EventType }  from "../store/events"

// #####################################
// PROPS / EVENTS
// #####################################
const props = defineProps({
  day: { type: Number, default: 0 },
  month: { type: Number, default: 0 },
  year: { type: Number, default: moment().year() },
  events: { type: Array<EventType> }
})


const eventsOfDay = computed(() => {
    if (!props.events) return []
    return props.events.filter(e => e.dayOfMonth == props.day)
})
    

</script>

<template>
    <div class="day-component">
        <p>{{  props.day + 1 }}</p>
        <div v-for="event of eventsOfDay">{{ event.name }}</div>
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