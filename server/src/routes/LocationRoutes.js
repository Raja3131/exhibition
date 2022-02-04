import { getCountries,getStatesByCountry,getCityByState} from "../controllers/LocationController.js";
import express from "express";

const LocationRouter = express.Router();

LocationRouter.get("/", getCountries);
LocationRouter.post("/:country", getStatesByCountry);
LocationRouter.post("/:country/:state", getCityByState);

export default LocationRouter;
