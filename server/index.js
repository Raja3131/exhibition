import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import logger from './src/loggers/logger.js'
import ShopRegisterRoutes from './src/routes/ShopRegisterRoutes.js'
import EventRegisterRoutes from './src/routes/EventRegisterRoutes.js'
import LocationRoutes from './src/routes/LocationRoutes.js'
import PromoterRoutes from './src/routes/PromoterRoutes.js'
import AuthenticationRouter from './src/routes/AuthenticationRoutes.js'
import errorHandler from './src/middleware/error.js'


const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(cors())
dotenv.config()

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`))})
.catch((err) => console.log(err))

app.use('/shops',ShopRegisterRoutes)
app.use('/events', EventRegisterRoutes)
app.use('/locations', LocationRoutes)
app.use('/promoters', PromoterRoutes)
app.use('/auth', AuthenticationRouter)
//error handler middleware should be last in the chain 
app.use(errorHandler)