import {EventServices}  from "../services/EventRegisterServices.js";

export const getAllEvents = async (req, res) =>{
    try {
        const events = await EventServices.getAllEvents();
        res.status(200).json(events);
        
    } catch (error) {
        res.status(500).send(error);
    }
        
    }

 export const createEvent = async (req, res) =>{
    try {
        const event = await EventServices.createEvent(req.body);
        res.status(200).json(event);
        
    } catch (error) {
        res.status(500).send(error);
    }
        
    }   

 export const getEventById = async (req, res) =>{
    try {
        const event = await EventServices.getEventById(req.params.id);
        res.status(200).json(event);
        
    } catch (error) {
        res.status(500).send(error);
    }
        
    }
 export const updateEvent = async (req, res) =>{
    try {
        const event = await EventServices.updateEvent(req.params.id, req.body);
        res.status(200).json(event);
        
    } catch (error) {
        res.status(500).send(error);
    }
        
    }

export const deleteEvent = async (req, res) =>{
    try {
        const event = await EventServices.deleteEvent(req.params.id);
        res.status(200).json(event);
        
    } catch (error) {
        res.status(500).send(error);
    }
        
    }

 export const getCountry = async (req, res) =>{
    try {
        const country = await EventServices.getCountry();
        res.status(200).json(country);
        
    } catch (error) {
        res.status(500).send(error);
    }
        
    }      

    