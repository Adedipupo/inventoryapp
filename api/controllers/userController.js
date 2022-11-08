import express from "express";
import asyncHandler from "express-async-handler"


export const registerUser = asyncHandler(async(req, res) =>{
    const {name, email, password} = req.body;
    const userExists = await UserModel.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await UserModel.create({
        name,
        email,
        password
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    }
})