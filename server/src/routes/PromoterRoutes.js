import { getAllPromoters,createPromoter,getPromoterById,updatePromoter,deletePromoter } from "../controllers/PromoterController.js";
import express from 'express'

const PromoterRoutes = express.Router();

PromoterRoutes.get('/', getAllPromoters);
PromoterRoutes.post('/', createPromoter);
PromoterRoutes.get('/:id', getPromoterById);
PromoterRoutes.put('/:id', updatePromoter);
PromoterRoutes.delete('/:id', deletePromoter);

export default PromoterRoutes;