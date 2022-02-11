import mongoose from 'mongoose'

const eventRegister = new mongoose.Schema({
      description: {
        type: String,
      },
      startdate: {
        type: Date,
      },
      enddate: {
        type: Date,
      },
      country: {
        type: String,
      },
      district: {
        type: String,
      },
      state: {
        type: String,
      },
      sponsor: {
        type: String,
      },
      organizer: {
        type: String,
      }
})


const EventRegister = mongoose.model('EventRegister', eventRegister)

export default EventRegister