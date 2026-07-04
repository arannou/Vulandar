import { defineStore } from 'pinia';
import { ref } from 'vue';


export class Event {
    name: string = ""
    dayOfMonth: number = 0
    month: number = 0
    year?: number = undefined
    description?: string = undefined
    recurring: boolean = false
}

export const useEventStore = defineStore('events', () => {

    // State
    const events = ref<Event[]>([ {
        name: "Mon Anniversaire",
        dayOfMonth: 22,
        month: 5,
        recurring: true
    }]);

    const getEventsByMonth = (year: number, month: number): Event[] => {
        return events.value.filter(e => (e.year == year || e.recurring) && e.month == month)
    };


    const createEvent = (event: Event) => {
        events.value.push(event)
    }


    return {
        events,
        getEventsByMonth,
        createEvent
    };
});