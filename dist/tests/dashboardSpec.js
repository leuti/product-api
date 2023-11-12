"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const dashboard_1 = require("../services/dashboard");
const request = (0, supertest_1.default)(server_1.default);
const store = new dashboard_1.DashboardQueries();
/* ===============================================================================
Routes in handler:
  app.get('/most_popular_products', index);
  app.get('/most_expensive_products', index);
================================================================================== */
xdescribe('DASHBOARD\n------------\n\nTesting dashboard handler', () => {
    it('GET /most_popular_products --> 5 most popular products', async () => {
        const response = await request.get('/most_popular_products'); // Make API call
        // Tests
        expect(response.status).toBe(200);
    });
    it('GET /most_expensive_products --> get 5 most expensive products', async () => {
        const response = await request.get(`/most_expensive_products`); // Make API call
        // Tests
        expect(response.status).toBe(200);
    });
});
xdescribe('Testing dashboard model', () => {
    it('productsInOrders', async () => {
        const response = await store.productsInOrders(); // Make call to function
        // Tests
        expect(response.length).toBeGreaterThan(0);
    });
    it('mostExpensiveProducts', async () => {
        const response = await store.mostExpensiveProducts(); // Make call to function
        // Tests
        expect(response.length).toBeGreaterThan(0);
    });
});
