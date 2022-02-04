import mongoose from 'mongoose'
// import ShopRegisterModel from './ShopRegisterModel.js'

const promoterSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    aadhar: {
        type: String,
    },
    photo: {
        type: String,
    },
shops : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShopRegisterModel'
}
    
},

    




)



const PromoterSchema = mongoose.model('PromoterSchema', promoterSchema)

export default PromoterSchema