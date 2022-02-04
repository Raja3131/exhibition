import mongoose from 'mongoose'

const shopSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },

    promoter:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PromoterModel'
    }
})

const Shop = mongoose.model('Shop', shopSchema)

export default Shop