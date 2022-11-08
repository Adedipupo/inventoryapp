import express from "express";


export const registerUser = (req, res) =>{
    if(!req.body.email){
         res.status(400)
            throw new Error("Please provide an email")
    }
    const {username, email, password} = req.body
    console.log(username, email, password)
    res.send({ 
        username,
        email,
        password
    })
}
