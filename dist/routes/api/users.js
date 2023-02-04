"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../../handlers/user");
const verifyAuthToken_1 = __importDefault(require("../../middlewares/verifyAuthToken"));
const userMethods = new user_1.UserHandler();
const users = express_1.default.Router();
users.get('/', verifyAuthToken_1.default, userMethods.index);
users.get('/:id', verifyAuthToken_1.default, userMethods.show);
users.post('/', userMethods.create);
exports.default = users;
