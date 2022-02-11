import { ShopDetailServices } from "../services/ShopDetailServices.js";

export const ShopDetailControllers = {
  getShopDetails: async (req, res) => {
    try {
      const shopDetails = await ShopDetailServices.getShopDetails(
        req.params.id
      );
      res.status(200).json(shopDetails);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllShopDetails: async (req, res) => {
    try {
      const shopDetails = await ShopDetailServices.getAllShopDetails();
      res.status(200).json(shopDetails);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  addShopDetails: async (req, res) => {
    try {
      const newShopDetails = await ShopDetailServices.addShopDetails(req.body);
      res.status(201).json(newShopDetails);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateShopDetails: async (req, res) => {
    try {
      const updatedShopDetails = await ShopDetailServices.updateShopDetails(
        req.params.id,
        req.body
      );
      res.status(200).json(updatedShopDetails);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteShopDetails: async (req, res) => {
    try {
      const deletedShopDetails = await ShopDetailServices.deleteShopDetails(
        req.params.id
      );
      res.status(200).json(deletedShopDetails);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getShopDetailsBySearch: async (req, res) => {
    try {
      const shopDetails = await ShopDetailServices.getShopDetailsBySearch(
        req.query.search
      );
      res.status(200).json(shopDetails);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
