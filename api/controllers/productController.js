import asyncHandler from 'express-async-handler'
import { ProductModel } from '../models/productModel.js'
import * as Cloudinary from 'cloudinary'
import { fileSizeFormatter } from '../utils/fileUpload.js'

export const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, description } = req.body

  if (!name || !sku || !category || !quantity || !price || !description) {
    res.status(400)
    throw new Error('Please provide all fields')
  }

  // Handle Image upload
  let fileData = {}
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile

    Cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    })
    try {
      uploadedFile = await Cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'Inventory App',
        resource_type: 'image',
      })
    } catch (error) {
      res.status(500)
      throw new Error('Image could not be uploaded')
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    }
  }

  const product = await ProductModel.create({
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    image: fileData,
  })

  res.status(201).json({
    msg: 'Product created successfully',
    data: product,
  })
})

export const getAllProduct = asyncHandler(async (req, res) => {
  const products = await ProductModel.find({ user: req.user.id }).sort(
    '-createdAt',
  )
  res.status(200).json({
    msg: 'successful',
    data: products,
  })
})

export const getProduct = asyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.id)
  // if product doesnt exist
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  res.status(200).json({
    msg: 'successful',
    data: product,
  })
})

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.id)
  // if product doesnt exist
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  await product.remove()
  res.status(200).json({ message: 'Product deleted.' })
})

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, description } = req.body

  const product = await ProductModel.findById(req.params.id)

  // if product doesnt exist
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  // Handle Image upload
  let fileData = {}
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile

    Cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    })
    try {
      uploadedFile = await Cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'Inventory App',
        resource_type: 'image',
      })
    } catch (error) {
      res.status(500)
      throw new Error('Image could not be uploaded')
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    }
  }

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name,
      category,
      quantity,
      price,
      description,
      image: Object.keys(fileData).length === 0 ? product?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    },
  )

  res.status(201).json({
    msg: 'Product updated successfully',
    data: updatedProduct,
  })
})
