import asyncHandler from "express-async-handler"

export const createProduct = asyncHandler(async (req, res) => {
    const {name,sku,category,quantity,price,description} = req.body;

    if (!name || !sku || !category || !quantity || !price || !description) {
        res.status(400)
        throw new Error('Please provide all fields')
      }
})