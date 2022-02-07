import { AuthenticationServices } from "../services/AuthenticationServices.js";
import ErrorResponse from "./../utils/errorResponse.js";
import sendEmail from "../utils/sendEmail.js";

export const AuthenticationController = {
  registerUser: async (req, res, next) => {
    try {
      const newUser = await AuthenticationServices.registerUser(req.body);
        sendTokenResponse(newUser, 201, res);
    } catch (err) {
      next(err);
    }
  },
  loginUser: async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      const message = ["Please provide email and password"];
      return next(new ErrorResponse(message, 400));
    }

    try {
      const user = await AuthenticationServices.loginUser(email, password);
      const matchUser = await user.matchPassword(password);

      if (!matchUser) {
        const message = ["Invalid credentials"];
        return next(new ErrorResponse(message, 401));
      }
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        const message = ["Invalid credentials"];
        /*if we dont write return here it will send a Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
                Error. otherwise return statement we can use else condition as well*/
        return next(new ErrorResponse(message, 401));
      }
        sendTokenResponse(user, 200, res);

    } catch (err) {
      return next(err);
    }
  },
  forgotPassword: async (req, res, next) => {
    const {email} = req.body;
    const user = await AuthenticationServices.forgotPassword(email);
    if(!user){
        const message = ["No user found with that email"];
        return next(new ErrorResponse(message, 404));
    }
    try {
        const resetToken = user.getResetPasswordToken();
        await user.save({
            
        })
        const resetUrl = `localhost:5000/resetPassword/${resetToken}`;
        const message =`
        <h2>You have requested password Reset</h2>
        <p>Click this <a href="${resetUrl}">link</a> to reset your password</p>`
        try{
            await sendEmail({
                to:email,
                subject:"Password reset",
                text:message
            })
            res.status(200).json({
                success:true,
                message:"Email sent"
            })
        


        }catch(err){
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
          await user.save({

          })
          return next(new ErrorResponse(["Email could not be sent"], 500));
        }
        
    } catch (err) {
      return next(err);
    }

    


  },
  resetPassword: async (req, res, next) => {
    const user = await AuthenticationServices.resetPassword(resetPasswordToken);

    
    try {

      if(!user){
        const message = ["Invalid token"];
        return next(new ErrorResponse(message, 400));
      }
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      res.status(200).json({
        success:true,
        message:"Password reset Success"
      })
      
    
    } catch (err) {
      return next(err);
    }

  }
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("token", token, options);
  res.status(statusCode).json({
    success: true,
    token,
  });
};
