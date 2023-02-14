"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = require("../../handlers/order");
const verifyAuthToken_1 = __importDefault(require("../../middlewares/verifyAuthToken"));
const orderMethods = new order_1.OrderHandler();
const orders = express_1.default.Router();
orders.get('/', verifyAuthToken_1.default, orderMethods.index);
orders.get('/:id', verifyAuthToken_1.default, orderMethods.show);
orders.get('/complete/:id', verifyAuthToken_1.default, orderMethods.completedOrder);
orders.get('/active/:id', verifyAuthToken_1.default, orderMethods.currentOrder);
orders.post('/', verifyAuthToken_1.default, orderMethods.create);
orders.post('/:id/products', verifyAuthToken_1.default, orderMethods.addProduct);
exports.default = orders;
