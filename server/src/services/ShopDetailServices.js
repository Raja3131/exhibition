import ShopDetails from "../models/ShopModel.js";

export const ShopDetailServices = {
  getShopDetails: async (id) => {
    try {
      const shopDetails = await ShopDetails.findById(id);
      return shopDetails;
    } catch (error) {
      throw error;
    }
  },
  getAllShopDetails: async () => {
    try {
      const shopDetails = await ShopDetails.find({}).sort({
        createdAt: -1,
      });
      return shopDetails;
    } catch (error) {
      throw error;
    }
  },
  addShopDetails: async (shopDetails) => {
    try {
      const newShopDetails = new ShopDetails(shopDetails);
      const savedShopDetails = await newShopDetails.save();
      return savedShopDetails;
    } catch (error) {
      throw error;
    }
  },
  updateShopDetails: async (id, shopDetails) => {
    try {
      const updatedShopDetails = await ShopDetails.findByIdAndUpdate(
        id,
        shopDetails,
        {
          new: true,
        }
      );
      return updatedShopDetails;
    } catch (error) {
      throw error;
    }
  },
  deleteShopDetails: async (id) => {
    try {
      const deletedShopDetails = await ShopDetails.findByIdAndDelete(id);
      return deletedShopDetails;
    } catch (error) {
      throw error;
    }
  },
  getShopDetailsBySearch: async (search) => {
    try {
      const shopDetails = await ShopDetails.find({
        $text: { $search: search },
      });
      return shopDetails;
    } catch (error) {
      throw error;
    }
  },
};
