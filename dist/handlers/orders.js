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
const orders_1 = require("../models/orders");
const utils_1 = __importStar(require("../services/utils"));
const store = new orders_1.OrderStore();
const orderRoutes = (app) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', utils_1.default, create);
    app.delete('/orders/:id', utils_1.default, destroy);
    app.post('/orders/:id/products', utils_1.default, addProduct);
};
const index = async (_req, res) => {
    try {
        const orders = await store.index();
        const ordersCamelCase = (0, utils_1.convertKeysToCamelCase)(orders);
        res.json(ordersCamelCase);
    }
    catch (err) {
        res.status(400).json({ error: err.message }); // Return error message as JSON
    }
};
const show = async (_req, res) => {
    try {
        const order = await store.show(_req.params.id);
        const orderCamelCase = (0, utils_1.convertKeysToCamelCase)(order);
        res.json(orderCamelCase);
    }
    catch (err) {
        res.status(400).json({ error: err.message }); // Return error message as JSON
    }
};
const create = async (_req, res) => {
    try {
        const order = {
            userId: _req.body.userId,
            status: _req.body.status,
        };
        const newOrder = await store.create(order);
        res.json(newOrder);
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
const addProduct = async (_req, res) => {
    const orderId = _req.params.id;
    const productId = _req.body.productId;
    const quantity = parseInt(_req.body.quantity);
    try {
        const addedProduct = await store.addProduct(quantity, orderId, productId);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400).json({ error: err.message }); // Return error message as JSON
    }
};
exports.default = orderRoutes;
