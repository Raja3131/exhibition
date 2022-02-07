import  Jwt  from "jsonwebtoken";
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";
export const protect = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return next(new ErrorResponse("Not Authorized to access this route",401))

    }

    try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET)
        const currentUser = await User.findById(decoded.id)
        if(!currentUser){
            return next(new ErrorResponse("No User Found with this id",401))
        }
        req.user = currentUser
        next()

    }
    catch (err) {
        return next(err)
    }

}