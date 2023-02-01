"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const user_1 = require("../user");
const request = (0, supertest_1.default)(server_1.default);
const store = new user_1.UserStore();
const newUser = {
    firstname: 'test',
    lastname: 'user',
    password: 'password',
};
describe('User Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have an create method', () => {
        expect(store.create(newUser)).toBeDefined();
    });
});
describe('User Endpoint', () => {
    it('should have an index method by endpoint', async () => {
        const response = await request.post('/api/users').send(newUser);
        expect(response.status).toBe(201);
    });
    it('should have an error when getting index by endpoint', async () => {
        const response = await request.get('/api/users');
        expect(response.status).toBe(401);
    });
    it('should have an error when getting a specific user by endpoint', async () => {
        const response = await request.get('/api/users/1');
        expect(response.status).toBe(401);
    });
});
