"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const dashboard_1 = require("../../services/dashboard");
const store = new dashboard_1.DashboardQueries();
const request = (0, supertest_1.default)(server_1.default);
describe('Dashboard Service Model', () => {
    it('should have a products in order model', async () => {
        expect(store.productsInOrder).toBeDefined();
    });
});
describe('Dashboard Service Endpoint', () => {
    it('should have a products in order endpoint', async () => {
        const response = await request.get('/api/dashboard/products_in_order');
        expect(response.status).toBe(200);
    });
});
