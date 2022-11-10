import express from "express";
import { getUser, loginStatus, loginUser, logoutUser, registerUser, updateUser } from "../controllers/userController.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router()


router.post('/signup', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/status', loginStatus)
router.get('/me',verifyUser, getUser)
router.put('/update',verifyUser, updateUser)



export default router;