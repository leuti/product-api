"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE id =($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rows[0] !== undefined) {
                return result.rows[0];
            }
            else {
                throw new Error(`order ${id} not existing.`);
            }
        }
        catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }
    async create(o) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [o.userId, o.status]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add new order ${o.id}. Error: ${err}`);
        }
    }
    async addProduct(quantity, orderId, productId) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [quantity, orderId, productId]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            const order = result.rows[0];
            conn.release();
            if (order !== undefined) {
                return order;
            }
            else {
                throw new Error(`order ${id} not existing.`);
            }
        }
        catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
