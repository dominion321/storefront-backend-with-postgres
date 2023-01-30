"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var order_1 = require("../../handlers/order");
var orderMethods = new order_1.OrderHandler();
var orders = express_1["default"].Router();
// orders.get('/index', orderMethods.index);
// orders.get('/show/:id', orderMethods.show);
orders.get('/show/:id', orderMethods.completedOrder);
orders.get('/show/:id', orderMethods.currentOrder);
// orders.post('/create', orderMethods.create);
exports["default"] = orders;
