import express from "express";
import { getUser, loginStatus, loginUser, logoutUser, registerUser, updateUser } from "../controllers/userController.js";

const router = express.Router()


router.post('/signup', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/status', loginStatus)
router.get('/me', getUser)
router.put('/update', updateUser)



export default router;