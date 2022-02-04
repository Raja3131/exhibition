import { PromoterServices } from "../services/PromoterServices.js";

export const getAllPromoters = async (req, res) => {

    try {

        const promoters = await PromoterServices.getAllPromoters();
        
        res.status(200).json(promoters);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const createPromoter = async (req, res) => {
    try {
        const promoter = await PromoterServices.createPromoter(req.body);
        res.status(200).json(promoter);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getPromoterById = async (req, res) => {
    try {
        const promoter = await PromoterServices.getPromoterById(req.params.id);
        res.status(200).json(promoter);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const updatePromoter = async (req, res) => {
    try {
        const promoter = await PromoterServices.updatePromoter(req.params.id, req.body);
        res.status(200).json(promoter);
    } catch (error) {
        res.status(500).send(error);
    }
}
export const deletePromoter = async (req, res) => {
    try {
        const promoter = await PromoterServices.deletePromoter(req.params.id);
        res.status(200).json(promoter);
    } catch (error) {
        res.status(500).send(error);
    }
}