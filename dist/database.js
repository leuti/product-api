"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { AWS_RDS_ENDPOINT, POSTGRES_DEV_DB, POSTGRES_TEST_DB, POSTGRES_USER, POSTGRES_PASSWORD, ENV, } = process.env;
let Client;
const sslOptions = {
    rejectUnauthorized: false,
    ca: './sslcerts/eu-central-1-bundle.pem',
    // cert: '',
    // key: '../sslcerts/private-key.pem',
};
const connectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${AWS_RDS_ENDPOINT}:5432/${ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DEV_DB}`;
Client = new pg_1.Pool({
    //connectionString: `postgres://postgres:postgres@database-1.chhg8l37c6tv.eu-central-1.rds.amazonaws.com:5432/postgres`, // sslmode=verify-full`,
    connectionString: connectionString,
    ssl: sslOptions, // Enable SSL for all environments*/
});
console.log(`Starting database: ENV=[${ENV}] | database = ${ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DEV_DB}  ConnectionString=${connectionString}`);
exports.default = Client;
