import ShopSchema from "../models/ShopRegisterModel.js";

export const ShopServices = {
    // Get all events from the database
    getAllShops: async () => {
        const Shops = await ShopSchema.find();
        return Shops;
    },
    // Get a single event from the database by id
    getShopById: async (id) => {
        const Shop = await ShopSchema.findById(id);
        return Shop;
    },
    // Create a new event in the database and return the new event object with the id field 
    createShop: async (Shop) => {
        const newShop = new ShopSchema(Shop);
        const savedShop = await newShop.save();
        return savedShop;
        
        
    },
    // Update an event in the database and return the updated event object
    updateShop: async (id, Shop) => {
        const updatedShop = await ShopSchema.findByIdAndUpdate(id, Shop, {new: true});
        return updatedShop;
    },
    // Delete an event from the database and return the deleted event object
    deleteShop: async (id) => {
        const deletedShop = await ShopSchema.findByIdAndDelete(id);
        return deletedShop;
    }
}