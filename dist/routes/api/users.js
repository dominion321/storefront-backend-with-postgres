"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var user_1 = require("../../handlers/user");
var verifyAuthToken_1 = __importDefault(require("../../middlewares/verifyAuthToken"));
var userMethods = new user_1.UserHandler();
var users = express_1["default"].Router();
users.get('/', verifyAuthToken_1["default"], userMethods.index);
users.get('/:id', verifyAuthToken_1["default"], userMethods.show);
users.post('/', userMethods.create);
exports["default"] = users;
