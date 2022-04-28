"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const assert_1 = __importDefault(require("assert"));
dotenv_1.default.config();
const { PORT, HOST, HOST_URL, API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } = process.env;
(0, assert_1.default)(PORT, 'PORT is required');
(0, assert_1.default)(HOST, 'HOST is required');
exports.default = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    firebaseConfig: {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        databaseURL: DATABASE_URL,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID
    }
};
