"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const product_1 = require("../product");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const request = (0, supertest_1.default)(server_1.default);
const store = new product_1.ProductStore();
const product = {
    name: 'test',
    price: 300,
    category: 'food',
};
let productId;
const category = 'food';
describe('Product Model', () => {
    it('should successfully create a product', async () => {
        const newProd = await store.create(product);
        const { id } = newProd;
        productId = id;
        expect(newProd.id).toBe(productId);
    });
    it('should have an index method', async () => {
        const index = await store.index();
        expect(index.length).toBeGreaterThan(0);
    });
    it('should successfully show a product', async () => {
        const show = await store.show(productId);
        expect(show.id).toBe(productId);
    });
    it('should successfully show products by given category', () => {
        expect(store.productsByCategory(category)).toBeDefined();
    });
    it('should successfully delete a product', async () => {
        const destroy = await store.destroy(productId);
        expect(destroy).toBe(true);
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
    it('should deny access when creating a product by endpoint', async () => {
        const response = await request.post('/api/products').send(product);
        expect(response.status).toBe(401);
    });
    it('should successfully show products by given category by endpoint', async () => {
        await request.post(`/api/products`).send(product);
        const response = await request.get(`/api/products/category/${category}`);
        expect(response.status).toBe(200);
    });
    it('should throw access denied when trying to delete products by endpoint', async () => {
        await request.post(`/api/products`).send(product);
        const response = await request.delete(`/api/products/2000`);
        expect(response.status).toBe(401);
    });
});
