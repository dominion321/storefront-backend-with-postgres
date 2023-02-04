"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var order_1 = require("../../handlers/order");
var verifyAuthToken_1 = __importDefault(require("../../middlewares/verifyAuthToken"));
var orderMethods = new order_1.OrderHandler();
var orders = express_1["default"].Router();
orders.get('/', orderMethods.index);
orders.get('/:id', orderMethods.show);
orders.get('/complete/:id', verifyAuthToken_1["default"], orderMethods.completedOrder);
orders.get('/active/:id', verifyAuthToken_1["default"], orderMethods.currentOrder);
orders.post('/', orderMethods.create);
orders.post('/:id/products', orderMethods.addProduct);
exports["default"] = orders;
