import express from 'express'
import { AuthenticationController } from '../controllers/AuthenticationController.js'
const AuthenticationRouter = express.Router()

AuthenticationRouter.post('/register', AuthenticationController.registerUser)
AuthenticationRouter.post('/login', AuthenticationController.loginUser)
AuthenticationRouter.post('/forgotPassword', AuthenticationController.forgotPassword)





export default AuthenticationRouter