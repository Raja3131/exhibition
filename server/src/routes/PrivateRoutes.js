import express from 'express'
import { getPrivateData } from '../controllers/PrivateController.js'
import { protect } from '../middleware/auth.js'

const PrivateRouter = express.Router()

PrivateRouter.get('/', protect,getPrivateData)



export default PrivateRouter