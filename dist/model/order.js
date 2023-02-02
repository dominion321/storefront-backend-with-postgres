"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    //INDEX Operation
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Error from Order Index ${error}`);
        }
    }
    //SHOW Operation
    async show(user_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=$1';
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot get order of ${user_id} ${error}`);
        }
    }
    //CREATE Operation
    async create(o) {
        const { product_id, quantity, user_id, status } = o;
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO orders(product_id, quantity, user_id, status) VALUES($1,$2,$3,$4) RETURNING *';
            const result = await conn.query(sql, [
                product_id,
                quantity,
                user_id,
                status,
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot create order ${error}`);
        }
    }
    //CURRENT ORDER Operation
    async currentOrder(user_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders WHERE user_id=($1) AND status = 'active'";
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Error from orders create model ${user_id} ${error}`);
        }
    }
    //COMPLETED ORDER Operation
    async completedOrder(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders WHERE user_id=($1) AND status =  'complete'";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Cannot get completed order of user ${id} ${error}`);
        }
    }
}
exports.OrderStore = OrderStore;
