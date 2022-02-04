import express from 'express'
import { ShopController } from "../controllers/ShopRegisterController.js";

const ShopRouter = express.Router()

ShopRouter.get('/', ShopController.getAllShops)
ShopRouter.get('/:id', ShopController.getShopById)
ShopRouter.post('/', ShopController.createShop)
ShopRouter.put('/:id', ShopController.updateShop)
ShopRouter.delete('/:id', ShopController.deleteShop)

export default ShopRouter