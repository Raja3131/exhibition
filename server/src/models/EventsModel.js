import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
    },
    time: {
        type: String,
    },
    location: {
        type: String,
    },
  
    createdBy: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
    },

})

const Event = mongoose.model('Event', eventSchema)

export default Event