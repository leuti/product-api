"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const pepper = process.env.BCRYPT_PASSWORD || '';
const saltRounds = parseInt(process.env.SALT_ROUNDS || '0');
dotenv_1.default.config();
class UserStore {
    // List all users in database
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw err;
        }
    }
    // List details for specific user
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rows[0] !== undefined) {
                return result.rows[0];
            }
            else {
                throw new Error('User ${id} not existing.');
            }
        }
        catch (err) {
            throw new Error(`Could not find User ${id}. Error: ${err}`);
        }
    }
    // Create new user
    async create(u) {
        try {
            const conn = await database_1.default.connect();
            // Step 1: Check if users with given login already exists
            const checkSql = 'SELECT * FROM users WHERE login=$1';
            const checkResult = await conn.query(checkSql, [u.login]);
            if (checkResult.rows.length > 0) {
                conn.release();
                throw new Error('UserExists');
            }
            // Step 2: if not, then insert the new user
            const sql = 'INSERT INTO users (login, first_name, last_name, password_hash) VALUES ($1, $2, $3, $4) RETURNING *';
            const hash = bcrypt_1.default.hashSync(u.passwordHash + pepper, saltRounds);
            const result = await conn.query(sql, [
                u.login,
                u.first_name,
                u.last_name,
                hash,
            ]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw err;
        }
    }
    // Delete given user
    async delete(id, token) {
        try {
            const conn = await database_1.default.connect();
            // First select the password_hash for give user
            const sql1 = 'SELECT password_hash FROM users WHERE id=($1)'; // Improvement: instead of comparing password_hash_digest I would just compare the user ID in the token
            const result_select = await conn.query(sql1, [id]);
            // Throw error if user with given id is not found
            if (!result_select.rows || result_select.rows.length === 0) {
                throw new Error(`User with id ${id} not found`);
            }
            const passwordHashStored = result_select.rows[0].password_hash; // store password_hash from the db
            // decode the token provided by the client
            const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
            // compare the password_hash from the DB with the hash provided by the client --> only if both match the user can be deleted
            if (passwordHashStored === decoded.user.password_hash) {
                const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
                const result = await conn.query(sql, [id]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            else {
                throw new Error(`Delete user NOT allowed. You can only delete your user.`);
            }
        }
        catch (err) {
            throw err;
        }
    }
    // Authenticate user --> Return password_hash if authorized; else null
    async authenticate(login, password) {
        const conn = await database_1.default.connect();
        const sql = 'SELECT * FROM users WHERE login=($1)';
        const result = await conn.query(sql, [login]);
        if (!result.rows.length) {
            // No user found with the provided login
            throw new Error('No user found with the given login credentials.');
        }
        const user = result.rows[0];
        if (result.rows.length) {
            if (bcrypt_1.default.compareSync(password + pepper, user.password_hash)) {
                // check if provided password and pepper match password_hash stored in DB
                user.token = bcrypt_1.default.hashSync(user.passwordHash + pepper, saltRounds);
                return user;
            }
        }
        return null;
    }
}
exports.UserStore = UserStore;
