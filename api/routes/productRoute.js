import express from "express";
import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from "../controllers/productController.js";
import { verifyUser } from "../middleware/authMiddleware.js";
import { upload } from "../utils/fileUpload.js";

const router = express.Router()

router.post('/create',verifyUser,upload.single("image"), createProduct)
router.get('/',verifyUser,getAllProduct)
router.get('/:id',verifyUser,getProduct)
router.delete('/:id',verifyUser,deleteProduct)
router.patch('/:id',verifyUser,upload.single("image"),updateProduct)

export default router;