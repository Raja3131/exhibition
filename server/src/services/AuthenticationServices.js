import User from "../models/User.js";
import crypto from "crypto";

export const AuthenticationServices = {
  registerUser: async (user) => {
    try {
      const newUser = await User.create(user);
      return newUser;
    } catch (err) {
      throw err;
    }
  },
  loginUser: async (email, password) => {
    try {
      const user = await User.findOne({ email: email }).select("+password");

      return user;
    } catch (err) {
      throw err;
    }
  },
forgotPassword: async (email) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (err) {
    throw err;
  }

    

},
  resetPassword: async (password) => {
    const resetPasswordToken = crypto.createHash("sha256").update(password).digest("hex");
    try {
      const user = await User.findOne({ resetPasswordToken: resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });
      return user;
    } catch (err) {
      throw err;
    }


   

  }

};
