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
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const utils_1 = __importStar(require("../services/utils"));
const store = new products_1.ProductStore();
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', utils_1.default, create);
    app.delete('/products/:id', utils_1.default, destroy);
    // app.post('/products/:id/products', addProduct); // utils.verifyAuthToken
};
const index = async (_req, res) => {
    try {
        const products = await store.index();
        const productsCamelCase = (0, utils_1.convertKeysToCamelCase)(products);
        res.json(productsCamelCase);
    }
    catch (err) {
        res.status(400).json({ error: err.message }); // Return error message as JSON
    }
};
const show = async (_req, res) => {
    try {
        const product = await store.show(_req.params.id);
        const productCamelCase = (0, utils_1.convertKeysToCamelCase)(product);
        res.json(productCamelCase);
    }
    catch (err) {
        res.status(400).json({ error: err.message }); // Return error message as JSON
    }
};
const create = async (_req, res) => {
    try {
        const product = {
            title: _req.body.name,
            description: _req.body.description,
            imageFile: _req.body.imageFile,
            price: _req.body.price,
            categoryId: _req.body.categoryId,
        };
        const newuser = await store.create(product);
        res.json(newuser);
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
exports.default = productRoutes;
