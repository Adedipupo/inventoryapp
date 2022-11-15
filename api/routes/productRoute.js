import express from "express";
import { createProduct } from "../controllers/productController.js";
import { verifyUser } from "../middleware/authMiddleware.js";
import { upload } from "../utils/fileUpload.js";

const router = express.Router()

router.post('/create',verifyUser,upload.single("image"), createProduct)



export default router;