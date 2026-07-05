import { defineStore } from 'pinia';
import { ref } from 'vue';

export enum Colors {
    RED = "#e25e54",
    ORANGE = "#ec9d53",
    YELLOW = "#eccf25",
    GREEN = "#4dce5e",
    BLUE = "#2589db",
    PURPLE = "#bd5ee2",
}

export class Event {
    name: string = ""
    dayOfMonth: number = 0
    month: number = 0
    color: Colors = Colors.BLUE
    year?: number = undefined
    description?: string = undefined
    recurring: boolean = false

    constructor(day: number, month: number, year: number) {
        this.dayOfMonth = day
        this.month = month
        this.year = year
    }
}

export const useEventStore = defineStore('events', () => {

    // State
    const events = ref<Event[]>([ {
        name: "My birthday 🎂",
        dayOfMonth: 22,
        month: 5,
        description: "Anniversaire d'Alicia !",
        recurring: true,
        color: Colors.YELLOW
    }, {
        name: "Fête nationale 🎆",
        dayOfMonth: 13,
        month: 6,
        recurring: true,
        color: Colors.PURPLE
    }, {
        name: "Entretien ?",
        dayOfMonth: 7,
        month: 6,
        description: "Futur entretien pour rejoindre vos équipes 😀. J'ai d'autres disponibilités bien sûr !",
        recurring: false,
        year: 2026,
        color: Colors.BLUE
    } ]);

    const getEventsByMonth = (year: number, month: number): Event[] => {
        return events.value.filter(e => (e.year == year || e.recurring) && e.month == month)
    };


    const createEvent = (event: Event) => {
        events.value.push(event)
    }

    const deleteEvent = (event: Event) => {
        events.value = events.value.filter(e => e != event)
    }


    return {
        events,
        getEventsByMonth,
        createEvent,
        deleteEvent
    };
});