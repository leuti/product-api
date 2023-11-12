"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryStore = void 0;
const database_1 = __importDefault(require("../database"));
class CategoryStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM categories';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get categories. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM categories WHERE id =($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rows[0] !== undefined) {
                return result.rows[0];
            }
            else {
                throw new Error(`Category ${id} not existing.`);
            }
        }
        catch (err) {
            throw new Error(`Could not find category ${id}. Error: ${err}`);
        }
    }
    async create(c) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO categories (name) VALUES($1) RETURNING *';
            const result = await conn.query(sql, [c.name]);
            const category = result.rows[0];
            conn.release();
            return category;
        }
        catch (err) {
            throw new Error(`Could not add new category ${c.name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM categories WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            const category = result.rows[0];
            conn.release();
            if (category !== undefined) {
                return category;
            }
            else {
                throw new Error(`Category ${id} not existing.`);
            }
        }
        catch (err) {
            throw new Error(`Could not delete category ${id}. Error: ${err}`);
        }
    }
}
exports.CategoryStore = CategoryStore;
