"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const index_1 = __importDefault(require("../index"));
const database = firebase_admin_1.default.initializeApp(index_1.default.firebaseConfig);
exports.default = database;
