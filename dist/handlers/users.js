"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../models/users");
const utils_1 = __importStar(require("../services/utils"));
const userRoutes = (app) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.delete('/users/:id', utils_1.default, destroy);
    app.post('/users/authenticate', authenticate);
};
const store = new users_1.UserStore();
// List all users in database
const index = async (_req, res) => {
    try {
        const users = await store.index();
        const usersCamelCase = (0, utils_1.convertKeysToCamelCase)(users);
        res.json(usersCamelCase);
    }
    catch (err) {
        res.status(400).json({ error: err.message }); // Return error message as JSON
    }
};
// List details for specific user
const show = async (_req, res) => {
    try {
        const user = await store.show(_req.params.id);
        const userCamelCase = (0, utils_1.convertKeysToCamelCase)(user);
        res.json(userCamelCase);
    }
    catch (err) {
        res.status(400).json({ error: err.message }); // Return error message as JSON
    }
};
// Create new user
const create = async (req, res) => {
    const user = {
        login: req.body.login,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        passwordHash: req.body.password,
    };
    try {
        const newUser = await store.create(user);
        console.log(`newUser: ${JSON.stringify(newUser)}`);
        try {
            var token = jsonwebtoken_1.default.sign({
                id: newUser.id,
                login: newUser.login,
                firstName: newUser.first_name,
                lastName: newUser.last_name,
            }, process.env.TOKEN_SECRET);
            res.json(token);
        }
        catch (jwtError) {
            console.error('Error signing the JWT', jwtError);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    catch (err) {
        // Check if user already exists
        if (err.message === 'UserExists') {
            res.status(409).json({ error: 'User with this login already exists.' });
        }
        else {
            res.status(400).json({ error: err.message }); // Return error message as JSON}
        }
    }
};
// Delete given user
const destroy = async (_req, res) => {
    const authorisationHeader = _req.headers.authorization;
    const token = authorisationHeader?.split(' ')[1];
    try {
        const deleted = await store.delete(_req.params.id, token ?? '');
        res.json(deleted);
    }
    catch (err) {
        res.status(400).json({ error: err.message }); // Return error message as JSON
    }
};
// Authenticate user
const authenticate = async (_req, res) => {
    const user = {
        login: _req.body.login,
        first_name: _req.body.firstName,
        last_name: _req.body.lastName,
        passwordHash: _req.body.password,
    };
    try {
        const u = await store.authenticate(user.login, user.passwordHash);
        console.log(`Authenticated user: ${JSON.stringify(u)}`);
        if (u === null) {
            throw new Error('Authentication failed: user not found');
            // const err: Error = new Error('Authentication failed');
            // res.status(401).json({ error: err.message }); // Return error message as JSON
        }
        try {
            var token = jsonwebtoken_1.default.sign({
                id: u.id,
                login: u.login,
                firstName: u.first_name,
                lastName: u.last_name,
            }, process.env.TOKEN_SECRET);
            console.log(`Authentication successful: u = ${JSON.stringify(u)}`);
            res.json(token);
        }
        catch (jwtError) {
            console.error('Error signing the JWT', jwtError);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    catch (err) {
        console.log(`Authentication failed`);
        res.status(401).json({ error: err.message }); // Return error message as JSON
    }
};
exports.default = userRoutes;
