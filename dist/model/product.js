"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    //INDEX Operation
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await database_1.default.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get items from products ${err}`);
        }
    }
    //CREATE Operation
    async create(p) {
        const conn = await database_1.default.connect();
        const sql = 'INSERT INTO products(name, price, category) VALUES ($1,$2,$3) RETURNING *';
        const result = await conn.query(sql, [p.name, p.price, p.category]);
        conn.release();
        const product = result.rows[0];
        return product;
    }
    //SHOW Operation
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await database_1.default.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot get product ${id}. ${err}`);
        }
    }
    //PRODUCT BY CATEGORY Operation
    async productsByCategory(category) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE category = $1';
            const result = await conn.query(sql, [category]);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Error from products by category method ${error}`);
        }
    }
    async destroy(product_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM products WHERE id=$1';
            await database_1.default.query(sql, [product_id]);
            conn.release();
            return true;
        }
        catch (error) {
            throw new Error(`Could Not Delete. ${error}`);
        }
    }
    //UPDATE Operation
    async update(p) {
        try {
            const { name, price, category, id } = p;
            const conn = await database_1.default.connect();
            const sql = 'UPDATE product SET name=$1, price = $2, category = $3 WHERE id = $4';
            const result = await conn.query(sql, [name, price, category, id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot update product ${p.name}. ${err} `);
        }
    }
}
exports.ProductStore = ProductStore;
