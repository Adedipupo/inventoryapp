import express from "express";
import asyncHandler from "express-async-handler"
import { UserModel } from "../models/userModel.js";


export const registerUser = asyncHandler(async(req, res) =>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please provide all fields");
    }

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
        const { _id,name,email,password,photo,phone,bio} = user;
        res.status(201).json({
            _id,name,email,photo,phone,bio
        })
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }

})