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

const emit = defineEmits<{
  (e: 'cancel'): void
}>()

// #####################################
// DATA
// #####################################
const error = ref<string | null>()
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
    if (editedEvent.value.description == "") delete editedEvent.value.description

    eventStore.createEvent(editedEvent.value)
    emit('cancel')
}
</script>

<template>
    <div class="event-component">
        <div class="form-div">
            <label for="name">Name</label>
            <input type="text" name="name" v-model="editedEvent.name"/>
        </div>
        <div class="form-div">
            <label for="description">Description</label>
            <input type="text" name="description" v-model="editedEvent.description"/>
        </div>
        <div class="form-div">
            <label for="recurring">Occurs every year</label>
            <input type="checkbox" name="recurring" v-model="editedEvent.recurring"/>
        </div>
        <div class="form-div">
            <label for="color">Color</label>
            <select name="month" v-model="editedEvent.color">
                <option v-for="[name, color] of Object.entries(Colors)" :value="color">{{ name }}</option>
            </select>
        </div>

        <p class="error-msg" v-if="error"> {{ error }}</p>
        <div>
            <button type="button" @click="save()">Save</button>
            <button type="button" @click="emit('cancel')">Cancel</button>
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