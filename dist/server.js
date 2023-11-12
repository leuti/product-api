"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import external modules
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// import internal modules
const categories_1 = __importDefault(require("./handlers/categories"));
const users_1 = __importDefault(require("./handlers/users"));
const products_1 = __importDefault(require("./handlers/products"));
const orders_1 = __importDefault(require("./handlers/orders"));
const dashboard_1 = __importDefault(require("./handlers/dashboard"));
const index_1 = __importDefault(require("./routes/index")); // routes for the images
const app = (0, express_1.default)();
// const address: string = 'Shopping-api-env.eba-8rhccdks.eu-central-1.elasticbeanstalk.com';
//const address: string = '0.0.0.0:3000';
// const port: string = '3000';
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/img', index_1.default);
app.get('/', function (req, res) {
    res.send('Welcome to the product shop! This is my first eb deployment');
});
(0, categories_1.default)(app);
(0, users_1.default)(app);
(0, products_1.default)(app);
(0, orders_1.default)(app);
(0, dashboard_1.default)(app);
app.listen(port, function () {
    console.log(`starting app on ${port}`);
});
exports.default = app;
