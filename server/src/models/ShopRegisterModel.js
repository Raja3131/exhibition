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

 
})

const Shop = mongoose.model('Shop', shopSchema)

export default Shop