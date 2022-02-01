import express from 'express'
import { EventController } from "../controllers/EventController.js";

const EventRouter = express.Router()

EventRouter.get('/', EventController.getAllEvents)
EventRouter.get('/:id', EventController.getEventById)
EventRouter.post('/', EventController.createEvent)
EventRouter.put('/:id', EventController.updateEvent)
EventRouter.delete('/:id', EventController.deleteEvent)

export default EventRouter