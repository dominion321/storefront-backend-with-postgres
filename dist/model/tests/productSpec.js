"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../../database"));
const server_1 = __importDefault(require("../../server"));
const product_1 = require("../product");
const request = (0, supertest_1.default)(server_1.default);
const store = new product_1.ProductStore();
const product = {
    name: 'test',
    price: 300,
    category: 'food',
};
beforeAll(async () => {
    const conn = await database_1.default.connect();
    const sql = 'SELECT * FROM products';
    const result = await conn.query(sql);
    conn.release();
    console.log(result.rows);
});
const category = 'food';
describe('Product Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should successfully create a product', () => {
        expect(store.create(product)).toBeDefined();
    });
    it('should successfully show a product', () => {
        expect(store.show('1')).toBeDefined();
    });
    it('should successfully show products by given category', () => {
        expect(store.productsByCategory(category)).toBeDefined();
    });
    it('should successfully delete a product', () => {
        expect(store.destory('1')).toBeDefined();
    });
});
describe('Product Endpoints', () => {
    it('should have an index method by endpoint', async () => {
        const response = await request.get('/api/products');
        expect(response.status).toBe(200);
    });
    it('should successfully show a product by endpoint', async () => {
        const response = await request.get('/api/products/1');
        expect(response.status).toBe(200);
    });
    it('should successfully create a product by endpoint', async () => {
        const response = await request.post('/api/products').send(product);
        expect(response.status).toBe(201);
    });
    it('should successfully show products by given category by endpoint', async () => {
        await request.post(`/api/products`).send(product);
        const response = await request.get(`/api/products/category/${category}`);
        expect(response.status).toBe(200);
    });
    it('should successfully delete products by endpoint', async () => {
        await request.post(`/api/products`).send(product);
        const response = await request.delete(`/api/products/2`);
        expect(response.status).toBe(200);
    });
});
