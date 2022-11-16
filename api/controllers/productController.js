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
    // let uploadedFile
    // try {
    //   uploadedFile = await Cloudinary.uploader.upload(req.file.path, {
    //     folder: 'Pinvent App',
    //     resource_type: 'image',
    //   })
    // } catch (error) {
    //   res.status(500)
    //   throw new Error('Image could not be uploaded')
    // }

    fileData = {
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    }
  }

  const product = await ProductModel({
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    image: fileData
  })

  res.status(201).json({
    msg: 'Product created successfully',
    data: product,
  })
})
