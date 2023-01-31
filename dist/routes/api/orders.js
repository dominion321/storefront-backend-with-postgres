"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = require("../../handlers/order");
const orderMethods = new order_1.OrderHandler();
const orders = express_1.default.Router();
orders.get('/', orderMethods.index);
orders.get('/:id', orderMethods.show);
orders.get('/completed/:id', orderMethods.completedOrder);
orders.get('/active/:id', orderMethods.currentOrder);
orders.post('/', orderMethods.create);
exports.default = orders;
