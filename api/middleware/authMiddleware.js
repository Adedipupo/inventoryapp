import { UserModel } from "../models/userModel.js";
import  jwt  from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';


export const verifyUser = asyncHandler(async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        res.status(401);
        throw new Error("Not authorized, please login");
      }
  
      // Verify Token
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      // Get user id from token
      const user = await UserModel.findById(verified.id).select("-password");
  
      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }
  });