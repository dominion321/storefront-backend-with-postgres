"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const order_2 = require("../../handlers/order");
const database_1 = __importDefault(require("../../database"));
const store = new order_1.OrderStore();
const request = (0, supertest_1.default)(server_1.default);
let stat = 'active';
const newOrder = {
    status: stat,
    user_id: '1'
};
const addedProduct = {
    quantity: 1,
    productId: 1,
    orderId: 1
};
const order = new order_2.OrderHandler();
beforeAll(async () => {
    const conn = await database_1.default.connect();
    const sql = "SELECT * FROM orders";
    const result = await conn.query(sql);
    conn.release();
    console.log(result.rows);
    return;
});
describe('Order Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create(newOrder)).toBeDefined();
    });
    it('should have a completed order method', () => {
        expect(store.completedOrder).toBeDefined();
    });
    it('should have a current order method', () => {
        expect(store.currentOrder).toBeDefined();
    });
    it('should  have an add product to an order method', () => {
        expect(store.addProducts).toBeDefined();
    });
});
describe('Order Endpoints', () => {
    it('should have a create method by endpoint', async () => {
        const response = await request.post('/api/orders').send(newOrder);
        expect(response.status).toBe(200);
    });
    it('should have an index method by endpoint', async () => {
        const response = await request.get('/api/orders');
        expect(response.status).toBe(200);
    });
    it('should have a show method by endpoint', async () => {
        const response = await request.get('/api/orders/1');
        expect(response.status).toBe(200);
    });
    it('should have a completed method by endpoint', async () => {
        const response = await request.get('/api/orders/complete/1');
        expect(response.status).toBe(401);
    });
    it('should have a active method by endpoint', async () => {
        const response = await request.get('/api/orders/active/2');
        expect(response.status).toBe(401);
    });
    it('should add a product to an order by endpoint', async () => {
        const response = await request.post('/api/orders/3/products').send(addedProduct);
        expect(response.status).toBe(201);
    });
});
