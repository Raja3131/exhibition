import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import logger from './src/loggers/logger.js'
import EventRoutes from './src/routes/EventRoutes.js'

const app = express()

app.use(express.json())
app.use(cors())
dotenv.config()

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`))})
.catch((err) => console.log(err))

app.use('/events', EventRoutes)