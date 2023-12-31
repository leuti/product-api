import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  AWS_RDS_ENDPOINT,
  POSTGRES_DEV_DB,
  POSTGRES_TEST_DB,
  POSTGRES_PROD_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
} = process.env;

let Client: Pool;

const sslOptions = {
  rejectUnauthorized: false, // Set to true if you want to verify the certificate
  ca: './sslcerts/eu-central-1-bundle.pem',
  // cert: '',
  // key: '../sslcerts/private-key.pem',
};

let database: string = ''; // Verwende 'string' anstelle von 'String'
if (ENV === 'prod') {
  database = POSTGRES_PROD_DB || ''; // Fallback zu leerem String, falls undefined
} else if (ENV === 'test') {
  database = POSTGRES_TEST_DB || ''; // Fallback zu leerem String, falls undefined
} else {
  database = POSTGRES_DEV_DB || ''; // Fallback zu leerem String, falls undefined
}

const connectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${AWS_RDS_ENDPOINT}:5432/${database}`;

Client = new Pool({
  //connectionString: `postgres://postgres:postgres@database-1.chhg8l37c6tv.eu-central-1.rds.amazonaws.com:5432/postgres`, // sslmode=verify-full`,
  connectionString: connectionString,
  ssl: sslOptions, // Enable SSL for all environments*/
});

console.log(
  `Starting database: ENV=[${ENV}] | database = [${database}] | ConnectionString=${connectionString}`
);

export default Client;
