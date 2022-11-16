import express from "express";
import {contactUs} from "../controllers/contactController.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/create',verifyUser,contactUs)

export default router;