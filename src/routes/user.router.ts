import { userCRUD } from"../controllers/user.controller";
import { usersText } from "../textreader/text";
import express from 'express';
const router = express.Router();

//const { checkToken } = require("../../auth/token_validation");
import twilio from "twilio";
import nodemailer from "nodemailer";

//router.get("/", );
router.post("/create", userCRUD.createUser);
router.post("/login", userCRUD.logIn);
router.get('/users', usersText.getAllUsers);
router.get('/user/:id', userCRUD.getUser);

export default router;