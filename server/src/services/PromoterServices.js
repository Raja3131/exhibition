import PromoterSchema from "../models/PromoterModel.js";

export const PromoterServices = {
    getAllPromoters: async () => {
        
        const promoters = await PromoterSchema.find();
        return promoters;
    },
    getPromoterById: async (id) => {
        const promoter = await PromoterSchema.findById(id);
        return promoter;
    },
    createPromoter: async (promoter) => {
        const newPromoter = new PromoterSchema(promoter);
        const result = await newPromoter.save();
        return result;
    },
    updatePromoter: async (id, promoter) => {
        const result = await PromoterSchema.findByIdAndUpdate(id, promoter);
        return result;
    },
    deletePromoter: async (id) => {
        const result = await PromoterSchema.findByIdAndRemove(id);
        return result;
    },
       

};
