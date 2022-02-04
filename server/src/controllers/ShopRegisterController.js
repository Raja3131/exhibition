import { ShopServices } from "../services/ShopRegistrationServices.js";


export const ShopController = {

    getAllShops: async (req, res) => {
        try {
            const shops = await ShopServices.getAllShops();
            res.json(shops);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getShopById: async (req, res) => {
        try {
            const shop = await ShopServices.getShopById(req.params.id);
            shop.findOne({ _id: req.params.id }).populate('promoter').exec(function (err, shop) {
                if (err) return handleError(err);
                console.log(shop);
            });

            res.json(shop);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    createShop: async (req, res) => {
        try {
            const newShop = await ShopServices.createShop(req.body);
            res.json(newShop);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    updateShop: async (req, res) => {
        try {
            const updatedShop = await ShopServices.updateShop(req.params.id, req.body);
            res.json(updatedShop);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    deleteShop: async (req, res) => {
        try {
            const deleteShop = await ShopServices.deleteShop(req.params.id);
            res.json(deleteShop);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}