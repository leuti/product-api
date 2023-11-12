"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categories_1 = require("../models/categories");
const utils_1 = __importDefault(require("../services/utils"));
const store = new categories_1.CategoryStore();
const categoryRoutes = (app) => {
    app.get('/categories', index);
    app.get('/categories/:id', show);
    app.post('/categories', utils_1.default, create);
    app.delete('/categories/:id', utils_1.default, destroy);
    // app.post('/categories/:id/products', addProduct); // utils.verifyAuthToken
};
const index = async (_req, res) => {
    try {
        const categories = await store.index();
        res.json(categories);
    }
    catch (err) {
        res.status(400).json({ error: err.message }); // Return error message as JSON
    }
};
const show = async (_req, res) => {
    try {
        const category = await store.show(_req.params.id);
        res.json(category);
    }
    catch (err) {
        res.status(400).json({ error: err.message }); // Return error message as JSON
    }
};
const create = async (_req, res) => {
    try {
        const category = {
            name: _req.body.name,
        };
        const newCategory = await store.create(category);
        res.json(newCategory);
    }
    catch (err) {
        res.status(400).json({ error: err.message }); // Return error message as JSON
    }
};
const destroy = async (_req, res) => {
    try {
        const deleted = await store.delete(_req.params.id);
        res.json(deleted);
    }
    catch (err) {
        res.status(400).json({ error: err.message }); // Return error message as JSON
    }
};
exports.default = categoryRoutes;
