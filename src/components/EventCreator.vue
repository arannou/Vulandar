<script setup lang="ts">
import { ref } from 'vue'
import moment from 'moment';
import { Event, useEventStore, Colors } from "../store/events"

const eventStore = useEventStore()
// #####################################
// PROPS / EVENTS
// #####################################
const props = defineProps({
  day: { type: Number, default: moment().date() },
  month: { type: Number, default: moment().month() },
  year: { type: Number, default: moment().year() }
})

const emit = defineEmits(['cancel'])

// #####################################
// DATA
// #####################################
const error = ref<string | undefined>(undefined);
const editedEvent = ref<Event>(new Event(props.day, props.month, props.year))


// #####################################
// METHODS
// #####################################
const save = () => {
    // checks and cleaning before saving
    error.value = ""
    if (editedEvent.value.name == "") {
        error.value = "Event must have a name"
        return
    }
    if (editedEvent.value.name.length > 100) {
        error.value = "Event name must be shorter than 100 characters"
        return
    }
    // avoid empty property
    if (editedEvent.value.description == "") delete editedEvent.value.description

    eventStore.createEvent(editedEvent.value)
    emit('cancel') // close the popup
}
</script>

<template>
  <div class="event-component">
    <div class="form-div">
      <label for="name">Name</label>
      <input
        v-model="editedEvent.name"
        type="text"
        name="name"
      >
    </div>
    <div class="form-div">
      <label for="description">Description</label>
      <input
        v-model="editedEvent.description"
        type="text"
        name="description"
      >
    </div>
    <div class="form-div">
      <label for="recurring">Occurs every year</label>
      <input
        v-model="editedEvent.recurring"
        type="checkbox"
        name="recurring"
      >
    </div>
    <div class="form-div">
      <label for="color">Color</label>
      <select
        v-model="editedEvent.color"
        name="month"
      >
        <option
          v-for="[name, color] of Object.entries(Colors)"
          :key="name"
          :value="color"
        >
          {{ name }}
        </option>
      </select>
    </div>

    <p
      v-if="error"
      class="error-msg"
    >
      {{ error }}
    </p>
    <div>
      <button
        type="button"
        @click="save()"
      >
        Save
      </button>
      <button
        type="button"
        @click="emit('cancel')"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<style>
.form-div label{
    display: block;
}

.event-component button {
    margin: 1rem;
    margin-bottom: 0;
}

.error-msg {
    border: red solid 1px;
    color: red;
    background-color: #f0cece;
    padding: 0.5rem;
}
</style>