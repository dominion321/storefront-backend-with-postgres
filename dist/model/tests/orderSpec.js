"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const user_1 = require("../user");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const database_1 = __importDefault(require("../../database"));
const store = new order_1.OrderStore();
const userStore = new user_1.UserStore();
const request = (0, supertest_1.default)(server_1.default);
let stat = 'active';
const newOrder = {
    status: stat,
    user_id: '1',
};
const addedProductOrder = {
    quantity: 1,
    productId: 1,
    orderId: 1,
};
const product = {
    name: 'test',
    price: 10,
    category: 'food',
};
let id;
const { name, price, category } = product;
beforeAll(async () => {
    try {
        const conn = await database_1.default.connect();
        const sql = 'INSERT INTO products (name, price, category) VALUES($1,$2,$3) RETURNING *';
        const result = await conn.query(sql, [name, price, category]);
        conn.release();
        id = result.rows[0]['id'];
    }
    catch (err) {
        throw new Error(`${err} from orderSpec`);
    }
});
beforeAll(async () => {
    const newUser = {
        firstname: 'lol',
        lastname: 'namama',
        password: 'chai',
    };
    const user = await userStore.create(newUser);
    const user_id = user.id;
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
        const response = await request
            .post(`/api/orders/${id}/products`)
            .send(addedProductOrder);
        expect(response.status).toBe(201);
    });
});
