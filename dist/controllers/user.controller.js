"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCRUD = void 0;
const database_1 = __importDefault(require("../config/database"));
const firestore = database_1.default.firestore();
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.userCRUD = {
    createUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const body = req.body;
            const salt = (0, bcryptjs_1.genSaltSync)(10);
            body.password = (0, bcryptjs_1.hashSync)(body.password, salt);
            const random = Math.floor(Math.random() * 1000);
            yield firestore.collection('users').doc().set(body);
            res.send('Record saved successfuly');
            let transporter = nodemailer_1.default.createTransport({
                host: 'smtp.mail.ru',
                auth: {
                    user: "sergehakobyan9596@mail.ru",
                    pass: "Z4Jr41p4P2UW55CVcCeD"
                }
            });
            let mailOptions = {
                from: 'sergehakobyan9596@mail.ru',
                to: `${req.body.email}`,
                subject: 'My first Email!!!',
                text: random.toString() + " " + "This is verification code"
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(info);
                }
            });
            const accountSid = "ACa252bb5445b6bd16a11b0bab28676974";
            const authToken = "e129305a256b91195597d4cd1749f4bb";
            const client = require('twilio')(accountSid, authToken);
            client.messages
                .create({
                body: random.toString() + " " + 'Your code',
                from: '+13868887307',
                to: `${req.body.phone}`
            })
                .then((message) => console.log(message.sid));
        }
        catch (error) {
            res.status(400).send(error.message);
            ;
        }
    }),
    logIn: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const usersDB = firestore.collection('users');
            const existingUser = yield usersDB.where("email", "==", email).get();
            if (existingUser.empty) {
                return res.status(401).send("User with that email not found");
            }
            else {
                existingUser.forEach((doc) => {
                    const user = doc.data();
                    if (user) {
                        const result = (0, bcryptjs_1.compareSync)(password, user.password);
                        if (result) {
                            Reflect.deleteProperty(user, 'password'); // The password is not visible
                            const jwt = (0, jsonwebtoken_1.sign)({ data: user }, "123", {
                                expiresIn: "1h"
                            });
                            return res.send(user);
                        }
                    }
                });
            }
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    }),
    getUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.body.id;
            const user = yield firestore.collection('users').doc(id);
            const data = yield user.get();
            if (!data.exists) {
                res.status(404).send('User with the given ID not found');
            }
            else {
                res.send(data.data());
            }
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    }),
};
