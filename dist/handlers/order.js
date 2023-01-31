"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderHandler = void 0;
const order_1 = require("../model/order");
const store = new order_1.OrderStore();
class OrderHandler {
    async index(_req, res) {
        try {
            const result = await store.index();
            res.status(200).json(result);
        }
        catch (error) {
            throw new Error(`Error from orders index handler ${error}`);
        }
    }
    async show(_req, res) {
        const user_id = _req.params.user_id;
        try {
            const result = await store.show(user_id);
            res.status(200).json(result);
        }
        catch (error) {
            throw new Error(`Error from orders show handler ${error}`);
        }
    }
    async create(_req, res) {
        const order = {
            product_id: _req.body.product_id,
            quantity: _req.body.quantity,
            status: _req.body.status,
            user_id: _req.body.user_id,
        };
        try {
            const result = await store.create(order);
            res.status(200).json(result);
        }
        catch (error) {
            throw new Error(`Error from orders create handler ${error}`);
        }
    }
    async currentOrder(_req, res) {
        const user_id = _req.params.user_id;
        try {
            const userOrder = await store.currentOrder(user_id);
            res.status(200).json(userOrder);
        }
        catch (error) {
            throw new Error(`Error from orders current Order handler${error} `);
        }
    }
    async completedOrder(_req, res) {
        const user_id = _req.params.user_id;
        try {
            const userOrder = await store.completedOrder(user_id);
            res.status(200).json(userOrder);
        }
        catch (error) {
            throw new Error(`Error from orders completed Order handler${error} `);
        }
    }
}
exports.OrderHandler = OrderHandler;
