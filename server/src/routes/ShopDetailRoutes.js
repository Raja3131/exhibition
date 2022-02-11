import express from 'express'
import { ShopDetailControllers } from "../controllers/ShopDetailControllers.js";

const ShopDetailRoutes = express.Router(
    
);

ShopDetailRoutes.get('/:id', ShopDetailControllers.getShopDetails);
ShopDetailRoutes.get('/', ShopDetailControllers.getAllShopDetails);
ShopDetailRoutes.post('/', ShopDetailControllers.addShopDetails);
ShopDetailRoutes.put('/:id', ShopDetailControllers.updateShopDetails);
ShopDetailRoutes.delete('/:id', ShopDetailControllers.deleteShopDetails);
ShopDetailRoutes.get('/search', ShopDetailControllers.getShopDetailsBySearch);

export default ShopDetailRoutes;
