"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardQueries = void 0;
const database_1 = __importDefault(require("../database"));
class DashboardQueries {
    //Getting all products added to an order
    async productsInOrder() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT name, price, order_id FROM products INNER JOIN orders_products ON products.id = orders_products.product_id';
            const queryResult = await conn.query(sql);
            conn.release();
            return queryResult.rows;
        }
        catch (error) {
            throw new Error(`Error from Dashboard Queries ${error}`);
        }
    }
}
exports.DashboardQueries = DashboardQueries;
