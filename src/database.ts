import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  AWS_RDS_ENDPOINT,
  POSTGRES_DEV_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
} = process.env;

let Client: Pool;

const sslOptions = {
  rejectUnauthorized: false, // Set to true if you want to verify the certificate
  ca: '../sslcerts/eu-central-1-bundle.pem',
  // cert: '',
  // key: '../sslcerts/private-key.pem',
};

const connectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${AWS_RDS_ENDPOINT}:5432/${
  ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DEV_DB
}`;

Client = new Pool({
  //connectionString: `postgres://postgres:postgres@database-1.chhg8l37c6tv.eu-central-1.rds.amazonaws.com:5432/postgres`, // sslmode=verify-full`,
  connectionString: connectionString,
  ssl: sslOptions, // Enable SSL for all environments*/
});

console.log(
  `Starting database: ENV=[${ENV}] | database = ${
    ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DEV_DB
  }  ConnectionString=${connectionString}`
);

export default Client;
