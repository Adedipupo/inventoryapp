import express from "express";
import { getUser, loginUser, logoutUser, registerUser } from "../controllers/userController.js";

const router = express.Router()


router.post('/signup', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/:id', getUser)


export default router;