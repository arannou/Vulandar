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

const isThisDayToday = computed(() => {
    return props.year == moment().year() && props.month == moment().month() && (props.day + 1) == moment().date()
})
    

</script>

<template>
    <div :class="{'day-component': true, 'today': isThisDayToday}">
        <p>{{  props.day + 1 }}</p>
        <div v-for="event of eventsOfDay" class="event-preview" :style="'background-color:'+event.color ">{{ event.name }}</div>
    </div>
</template>

<style>
.day-component {
    border: 1px solid #eee;
    min-height: 4rem;
}
.day-component.today {
    border-color: yellow
}
.day-component:hover {
    background-color: #b5c5f567;
    cursor: pointer;
}
.event-preview {
    color: white;
    border-radius: 10px;
    margin: auto;
    font-size: .7rem;
    max-width: 12vw;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

@media screen and (min-height: 700px) {
}

</style>