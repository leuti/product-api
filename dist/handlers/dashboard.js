"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../services/dashboard");
const utils_1 = require("../services/utils");
const dashboardRoutes = (app) => {
    app.get('/most_popular_products', productsInOrders);
    app.get('/most_expensive_products', mostExpensiveProducts);
};
const dashboard = new dashboard_1.DashboardQueries();
const productsInOrders = async (_req, res) => {
    try {
        const products = await dashboard.productsInOrders();
        const productsCamelCase = (0, utils_1.convertKeysToCamelCase)(products);
        res.json(productsCamelCase);
    }
    catch (err) {
        res.status(400).json({ error: err.message }); // Return error message as JSON
    }
};
const mostExpensiveProducts = async (_req, res) => {
    try {
        const products = await dashboard.mostExpensiveProducts();
        const productsCamelCase = (0, utils_1.convertKeysToCamelCase)(products);
        res.json(productsCamelCase);
    }
    catch (err) {
        res.status(400).json({ error: err.message }); // Return error message as JSON
    }
};
exports.default = dashboardRoutes;
