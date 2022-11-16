import express from "express";
import { createProduct, deleteProduct, getAllProduct, getProduct } from "../controllers/productController.js";
import { verifyUser } from "../middleware/authMiddleware.js";
import { upload } from "../utils/fileUpload.js";

const router = express.Router()

router.post('/create',verifyUser,upload.single("image"), createProduct)
router.get('/',verifyUser,getAllProduct)
router.get('/:id',verifyUser,getProduct)
router.delete('/:id',verifyUser,deleteProduct)


export default router;