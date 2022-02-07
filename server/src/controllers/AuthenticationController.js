import { AuthenticationServices } from "../services/AuthenticationServices.js";
import ErrorResponse from './../utils/errorResponse.js';


export const AuthenticationController = {
    registerUser: async (req, res,next) => {
        try {
            const newUser = await AuthenticationServices.registerUser(req.body);
            res.status(201).json(newUser);
        } catch (err) {
            next(err);
        }
    },
    loginUser:async(req,res,next)=>{

        const {email,password}=req.body;
        if(!email || !password){
            const message=["Please provide email and password"];
            next(new ErrorResponse(message,400));
        }
      
        try{
            const user=await AuthenticationServices.loginUser(email,password)
            const matchUser=await user.matchPassword(password);

            if(!matchUser){
                const message=["Invalid credentials"];
                next(new ErrorResponse(message,401));
            }
            const isMatch = await user.matchPassword(password);
            if(!isMatch){
                const message=["Invalid credentials"];
                next(new ErrorResponse(message,401));
            }

          
            res.status(200).json({user:user,message:"Login Successful"});

        }
        catch(err){
            res.status(500).json({message:err.message})
        }
    }
    
}