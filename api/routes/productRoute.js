import express from "express";
import { createProduct } from "../controllers/productController.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/create',verifyUser, createProduct)



export default router;