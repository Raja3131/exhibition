import User from "../models/User.js";

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
};
