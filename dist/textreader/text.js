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
exports.usersText = void 0;
const user_service_1 = __importDefault(require("../service/user.service"));
const database_1 = __importDefault(require("../config/database"));
const firestore = database_1.default.firestore();
const fs_1 = __importDefault(require("fs"));
exports.usersText = {
    getAllUsers: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield firestore.collection("users");
            const data = yield users.get();
            const usersArray = [];
            if (data.length === 0) {
                res.status(404).send("No user record found");
            }
            else {
                data.forEach((doc) => {
                    const user = new user_service_1.default(doc.id, doc.data().firstName, doc.data().lastName, doc.data().email, doc.data().password, doc.data().phone);
                    usersArray.push(user);
                });
                function writeInFile(ext) {
                    if (ext === "csv") {
                        fs_1.default.writeFileSync("src/textreader/text.csv", csvString);
                    }
                    else if (ext === "xlsx") {
                        fs_1.default.writeFileSync("src/textreader/text.xlsx", csvString);
                    }
                    else {
                        fs_1.default.writeFileSync("src/textreader/text.txt", csvString);
                    }
                }
                const csvString = [
                    [
                        "User ID",
                        "User Firstname",
                        "User Lastname",
                        "User Email",
                        "User Password",
                    ],
                    ...usersArray.map((item) => [
                        item.id,
                        item.firstName,
                        item.lastName,
                        item.email,
                        item.password,
                    ]),
                ]
                    .map((e) => e.join(","))
                    .join("\n");
                writeInFile("xlsx");
                res.send(csvString);
            }
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    }),
};
