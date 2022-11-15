import asyncHandler from "express-async-handler"
import { ProductModel } from "../models/productModel.js";

export const createProduct = asyncHandler(async (req, res) => {
    const {name,sku,category,quantity,price,description} = req.body;

    if (!name || !sku || !category || !quantity || !price || !description) {
        res.status(400)
        throw new Error('Please provide all fields')
      }

    const product = await ProductModel({
        user: req.user.id,
        name,
        sku,
        category,
        quantity,
        price,
        description
    })

    res.status(201).json({
        msg: 'Product created successfully',
        data: product
    })
})