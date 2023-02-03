"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./api/users"));
const products_1 = __importDefault(require("./api/products"));
const orders_1 = __importDefault(require("./api/orders"));
const dashboard_1 = __importDefault(require("./api/dashboard"));
const routes = express_1.default.Router();
routes.use('/users', users_1.default);
routes.use('/products', products_1.default);
routes.use('/orders', orders_1.default);
routes.use('/dashboard', dashboard_1.default);
exports.default = routes;
