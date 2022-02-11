import mongoose from 'mongoose';

const shopDetailSchema = mongoose.Schema({
 
    shopName: {
        type: String,
    },
    shopAddress: {
        type: String,

    },
    description:{
        type: String,

    },
    
    shopRating:{
        type: Number,
    },
    shopImage:{
        type: String,
    },

    
},
{
    timestamps: true
    
})

const ShopDetails = mongoose.model('ShopDetails',shopDetailSchema);

export default ShopDetails;