import express from "express";
import {getAllEvents,createEvent,getEventById,updateEvent,deleteEvent} from "../controllers/EventRegisterController.js";
const EventsRouters = express.Router();

EventsRouters.get("/", getAllEvents);
EventsRouters.post("/", createEvent);
EventsRouters.get("/:id", getEventById);
EventsRouters.put("/:id", updateEvent);
EventsRouters.delete("/:id", deleteEvent);


export default EventsRouters;


// Language: javascript
// Path: server\src\routes\EventRegisterRoutes.js
// Compare this snippet from server\src\services\EventRegisterServices.js:
// import EventSchema from "../models/EventRegisterModel.js";