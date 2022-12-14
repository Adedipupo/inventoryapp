import express from "express";
import { changePassword, forgotPassword, getUser, loginStatus, loginUser, logoutUser, registerUser, resetPassword, updateUser } from "../controllers/userController.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router()


router.post('/signup', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/status', loginStatus)
router.get('/me',verifyUser, getUser)
router.put('/update',verifyUser, updateUser)
router.patch('/changepassword',verifyUser, changePassword)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resetToken',resetPassword)


export default router;