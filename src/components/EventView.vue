<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Event, useEventStore } from "../store/events"


const eventStore = useEventStore()

// #####################################
// PROPS / EVENTS
// #####################################
const props = defineProps({
  existingEvent: Event
})

const emit = defineEmits(['cancel'])

const displayedEvent = ref<Event>(new Event(0, 0, 1970))

onMounted(() => {
    if (props.existingEvent) {
        displayedEvent.value = props.existingEvent
    }
})

// #####################################
// METHODS
// #####################################
const deleteEvent = () => {
    if (props.existingEvent) {
        eventStore.deleteEvent(props.existingEvent)
    }
    emit('cancel') // close the popup
}
</script>

<template>
  <div class="event-component">
    <div class="form-div">
      <label for="name">Name</label>
      <strong>{{ displayedEvent.name }}</strong>
    </div>
    <div class="form-div">
      <label for="description">Description</label>
      <strong> {{ displayedEvent.description || "No description" }}</strong>
    </div>
    <div class="form-div">
      <label for="recurring">Occurs every year</label>
      <p> {{ displayedEvent.recurring ? "✅" : "❌" }}</p>
    </div>

    <div>
      <button
        type="button"
        @click="deleteEvent()"
      >
        Delete
      </button>
      <button
        type="button"
        @click="emit('cancel')"
      >
        Close
      </button>
    </div>
  </div>
</template>

<style>
.form-div {
    color: white;
}
.form-div label{
    display: block;
}

.event-component button {
    margin: 1rem;
    margin-bottom: 0;
}
</style>