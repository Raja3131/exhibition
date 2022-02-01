import Event from "../models/EventsModel.js";

export const EventServices = {
    // Get all events from the database
    getAllEvents: async () => {
        const events = await Event.find();
        return events;
    },
    // Get a single event from the database by id
    getEventById: async (id) => {
        const event = await Event.findById(id);
        return event;
    },
    // Create a new event in the database and return the new event object with the id field 
    createEvent: async (event) => {
        const newEvent = await Event.create(event);
        return newEvent;
    },
    // Update an event in the database and return the updated event object
    updateEvent: async (id, event) => {
        const updatedEvent = await Event.findByIdAndUpdate(id, event, {new: true});
        return updatedEvent;
    },
    // Delete an event from the database and return the deleted event object
    deleteEvent: async (id) => {
        const deletedEvent = await Event.findByIdAndDelete(id);
        return deletedEvent;
    }
}