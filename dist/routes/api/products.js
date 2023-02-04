"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var product_1 = require("../../handlers/product");
var verifyAuthToken_1 = __importDefault(require("../../middlewares/verifyAuthToken"));
var productMethods = new product_1.ProductHandler();
var products = express_1["default"].Router();
products.get('/', productMethods.index);
products.get('/:id', productMethods.show);
products.get('/category/:category', productMethods.productsByCategory);
products.post('/', verifyAuthToken_1["default"], productMethods.create);
products["delete"]('/:product_id', verifyAuthToken_1["default"], productMethods.destroy);
exports["default"] = products;
