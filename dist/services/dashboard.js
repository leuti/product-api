"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardQueries = void 0;
const database_1 = __importDefault(require("../database"));
class DashboardQueries {
    // Get all products that have been included in orders
    async productsInOrders() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products INNER JOIN order_products ON products.id = order_products.id LIMIT 5';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Unable to get products and orders: ${err}`);
        }
    }
    // Get 5 most expensive products
    async mostExpensiveProducts() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products ORDER BY price DESC LIMIT 5';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Unable to get most expensive products: ${err}`);
        }
    }
}
exports.DashboardQueries = DashboardQueries;
