"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../../handlers/product");
const verifyAuthToken_1 = __importDefault(require("../../middlewares/verifyAuthToken"));
const productMethods = new product_1.ProductHandler();
const products = express_1.default.Router();
products.get('/', productMethods.index);
products.get('/:id', productMethods.show);
products.get('/category/:category', productMethods.productsByCategory);
products.post('/', verifyAuthToken_1.default, productMethods.create);
products.delete('/:product_id', verifyAuthToken_1.default, productMethods.destroy);
exports.default = products;
