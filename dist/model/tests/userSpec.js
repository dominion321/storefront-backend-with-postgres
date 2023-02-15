"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const user_1 = require("../user");
//Initializing supertest module and user model respectively
const request = (0, supertest_1.default)(server_1.default);
const store = new user_1.UserStore();
//New User Object
const newUser = {
    firstname: 'test',
    lastname: 'user',
    password: 'password',
};
//Initialized user id variable
let userId;
describe('User Model', () => {
    it('should have an create method', async () => {
        const user = await store.create(newUser);
        const { id } = user;
        userId = id;
        expect(user.id).toBe(userId);
    });
    it('should have an index method', async () => {
        const index = await store.index();
        expect(index.length).toBeGreaterThan(0);
    });
    it('should have a show method', async () => {
        const show = await store.show(userId);
        expect(show.id).toBe(userId);
    });
});
describe('User Endpoint', () => {
    it('should have an create method by endpoint', async () => {
        const response = await request.post('/api/users').send(newUser);
        expect(response.status).toBe(201);
    });
    it('should deny access when getting index by endpoint', async () => {
        const response = await request.get('/api/users');
        expect(response.status).toBe(401);
    });
    it('should deny access when getting a specific user by endpoint', async () => {
        const response = await request.get('/api/users/1');
        expect(response.status).toBe(401);
    });
});
