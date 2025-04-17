import express from "express";
import { userController } from "../controllers/user.js";
import { middleware } from "../middleware/user.js";

export const userRouter = express.Router();

userRouter
    .post('/register', userController.signUp)
    .post('/login', userController.signIn);