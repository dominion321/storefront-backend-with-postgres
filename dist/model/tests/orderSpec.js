"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const user_1 = require("../user");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const product_1 = require("../product");
//Instances for the order, user and product objects
const orderStore = new order_1.OrderStore();
const userStore = new user_1.UserStore();
const productStore = new product_1.ProductStore();
//Instance for the supertest module
const request = (0, supertest_1.default)(server_1.default);
//Order object
const newOrder = {
    status: 'active',
    user_id: '1',
};
//User object
const newUser = {
    firstname: 'test',
    lastname: 'test',
    password: 'testing',
};
//Object for use in the add product to order test
const addedProductOrder = {
    quantity: 1,
    orderId: '1',
};
//Destructured values from the addedProductOrder object
const { quantity, orderId } = addedProductOrder;
//Product object
const product = {
    name: 'test',
    price: 1000,
    category: 'test',
};
//Initialized ids for user, order and product
let userId;
let id;
let productId;
//Creating a User first to aid tests
beforeAll(async () => {
    try {
        const user = await userStore.create(newUser);
        const { id } = user;
        userId = id;
    }
    catch (error) {
        throw new Error(`${error} from create user at orderspec`);
    }
});
//Creating a Product first to aid test
beforeAll(async () => {
    try {
        await productStore.create(product);
    }
    catch (error) {
        throw new Error(`${error} from order spec create new product in beforeAll function`);
    }
});
// <=========== ** THE TESTS ** ===========>
describe('Order Model', () => {
    it('should have an index method', async () => {
        //Create an order first before fetching order index
        await orderStore.create(newOrder);
        const result = await orderStore.index();
        expect(result.length).toBeGreaterThan(0);
    });
    it('should have a show method', async () => {
        const result = await orderStore.show(userId);
        expect(result.user_id).toBe(`${userId}`);
    });
    it('should have a create method', async () => {
        const result = await orderStore.create(newOrder);
        expect(result.status).toBe('active');
    });
    it('should have a completed order method', async () => {
        const order = {
            status: 'complete',
            user_id: '1',
        };
        const result = await orderStore.create(order);
        expect(result.status).toBe('complete');
    });
    it('should have a current order method', async () => {
        const result = await orderStore.create(newOrder);
        expect(result.status).toBe('active');
    });
    it('should have an add product to an order method', async () => {
        const newOrderAdded = await orderStore.addProducts(quantity, orderId, productId);
        expect(newOrderAdded.id).toBe(1);
    });
});
describe('Order Endpoints', () => {
    it('should deny access to the create method by endpoint', async () => {
        const response = await request.post('/api/orders').send(newOrder);
        expect(response.status).toBe(401);
    });
    it('should deny access to the index method by endpoint', async () => {
        const response = await request.get('/api/orders');
        expect(response.status).toBe(401);
    });
    it('should deny access to the show method by endpoint', async () => {
        const response = await request.get('/api/orders/1');
        expect(response.status).toBe(401);
    });
    it('should deny access to the completed method by endpoint', async () => {
        const response = await request.get('/api/orders/complete/1');
        expect(response.status).toBe(401);
    });
    it('should deny access to the active method by endpoint', async () => {
        const response = await request.get('/api/orders/active/2');
        expect(response.status).toBe(401);
    });
    it('should deny access to the add a product to an order by endpoint', async () => {
        const response = await request
            .post(`/api/orders/${id}/products`)
            .send(addedProductOrder);
        expect(response.status).toBe(401);
    });
});
