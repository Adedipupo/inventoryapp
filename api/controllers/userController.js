import asyncHandler from 'express-async-handler'
import { UserModel } from '../models/userModel.js'
import { generateToken } from '../utils/generateToken.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please provide all fields')
  }

  const userExists = await UserModel.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await UserModel.create({
    name,
    email,
    password,
  })

  const token = generateToken(user._id);

  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    // sameSite: "none",
    // secure: true,
  });

  if (user) {
      const { _id, name, email, photo, phone, bio } = user
      res.status(201).json({
          _id,
          name,
          email,
          photo,
          phone,
          bio,
          token
        })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Please provide all fields')
  }

  const user = await UserModel.findOne({ email })
  if (!user) {
    res.status(400)
    throw new Error('User does not exists')
  }

  const token = generateToken(user._id);

  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    // sameSite: "none",
    // secure: true,
  });

  const passwordCorrect = await bcrypt.compare(password,user.password)

  // if (user && await user.matchPassword(password)) {
  if (user && passwordCorrect) {
      const { _id, name, email, photo, phone, bio} = user
      res.status(201).json({
          _id,
          name,
          email,
          photo,
          phone,
          bio,
          token
        })
  } else {
    res.status(400)
    throw new Error('Invalid login details')
  }
})

export const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  // Verify Token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() - 1000 * 86400),
    // sameSite: "none",
    // secure: true,
  });
  res.status(200).json({
    message: 'Logout Successful'
  })
})

export const getUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id)

  if(!user) {
    res.status(404)
    throw new Error('User not found')
  }

  if (user) {
    const { _id, name, email, photo, phone, bio } = user
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id)

  if(!user) {
    res.status(404)
    throw new Error('User not found')
  }

  if (user) {
    user.email =  email
    user.name = req.body.name || user.name
    user.photo = req.body.photo || user.photo
    user.phone = req.body.phone || user.phone
    user.bio = req.body.bio || user.bio

    const updatedUser = await user.save()

    const { _id, name, email, photo, phone, bio } = updatedUser
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export const changePassword = asyncHandler(async (req, res)=>{
  const user = await UserModel.findById(req.user._id)

  if(!user) {
    res.status(404)
    throw new Error('User not found')
  }

  if (user) {
    const {oldPassword, password} = req.body;

    if(!oldPassword || !password) {
      res.status(400)
      throw new Error('Please provide all fields')
    }

    const passwordCorrect = await bcrypt.compare(oldPassword,user.password)
    if(passwordCorrect){
      user.password = req.body.password
      await user.save()
      res.status(200).json({
        message: 'Password Changed Successfully'
      })
    } else {
      res.status(400)
      throw new Error('Old Password is incorrect')
    }
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})