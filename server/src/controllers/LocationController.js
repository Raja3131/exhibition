import {LocationServices} from '../services/LocationServices.js';

export const getCountries = async (req, res) =>{
    try {
        const country = await LocationServices.getCountry();
      
        res.status(200).json(country);
        
    } catch (error) {
        res.status(500).send(error);
    }
        
    }

    export const getStatesByCountry = async (req, res) =>{
        try {
            const state = await LocationServices.getStateByCountry(req.params.country);
          
            res.status(200).json(state);
            
        } catch (error) {
            res.status(500).send(error);
        }
            
     
            
        }

   export const getCityByState = async (req, res) =>{
    try {
        const city = await LocationServices.getCityByState(req.params.country,req.params.state, );
      
        res.status(200).json(city);
        
    } catch (error) {
        res.status(500).send(error);
    }
        
    }     

    export const getCountriesBySearch = async (req, res) =>{
     const searchQuery =req.query  
    try {
        const country = await LocationServices.getCountryBySearch(searchQuery);
      
        res.status(200).json(country);
        
    } catch (error) {
        res.status(500).send(error);
    }
            
     
            
        }

    