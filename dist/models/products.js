"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE id =($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rows[0] !== undefined) {
                return result.rows[0];
            }
            else {
                throw new Error('Product ${id} not existing.');
            }
        }
        catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }
    async create(p) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO products (title, description, image_file, price, category_id) VALUES($1, $2, $3, $4, $5) RETURNING *';
            const result = await conn.query(sql, [
                p.title,
                p.description,
                p.imageFile,
                p.price,
                p.categoryId,
            ]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not add new product ${p.title}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];
            conn.release();
            if (product !== undefined) {
                return product;
            }
            else {
                throw new Error('Product ${id} not existing.');
            }
        }
        catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
