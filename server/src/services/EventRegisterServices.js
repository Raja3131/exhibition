import EventSchema from "../models/EventRegisterModel.js";
// import csc from 'countries-states-cities'

export const EventServices = {
    getAllEvents: async () => {
        const events = await EventSchema.find();
        return events;
    },
    createEvent: async (event) => {
        const newEvent = new EventSchema(event);
        const savedEvent = await newEvent.save();
        return savedEvent;

    },
    getEventById: async (id) => {
        const event = await EventSchema.findById(id);
        return event;
    },
    updateEvent: async (id, event) => {
        const updatedEvent = await EventSchema.findByIdAndUpdate(id, event, { new: true });
        return updatedEvent;
    },
    deleteEvent: async (id) => {
        const deletedEvent = await EventSchema.findByIdAndDelete(id);
        return deletedEvent;
    },
 
}
