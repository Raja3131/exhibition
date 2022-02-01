import { EventServices } from "../services/EventServices.js";


export const EventController = {

    getAllEvents: async (req, res) => {
        try {
            const events = await EventServices.getAllEvents();
            res.json(events);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getEventById: async (req, res) => {
        try {
            const event = await EventServices.getEventById(req.params.id);
            res.json(event);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    createEvent: async (req, res) => {
        try {
            const newEvent = await EventServices.createEvent(req.body);
            res.json(newEvent);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    updateEvent: async (req, res) => {
        try {
            const updatedEvent = await EventServices.updateEvent(req.params.id, req.body);
            res.json(updatedEvent);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    deleteEvent: async (req, res) => {
        try {
            const deletedEvent = await EventServices.deleteEvent(req.params.id);
            res.json(deletedEvent);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}