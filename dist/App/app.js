"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../index"));
const user_router_1 = __importDefault(require("../routes/user.router"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use("/users", user_router_1.default);
app.listen(index_1.default.port, () => console.log('App is listening on url http://localhost:' + index_1.default.port));
