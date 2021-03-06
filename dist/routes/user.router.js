"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const text_1 = require("../textreader/text");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//router.get("/", );
router.post("/create", user_controller_1.userCRUD.createUser);
router.post("/login", user_controller_1.userCRUD.logIn);
router.get('/users', text_1.usersText.getAllUsers);
router.get('/user/:id', user_controller_1.userCRUD.getUser);
exports.default = router;
