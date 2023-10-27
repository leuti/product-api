import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_DEV_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
} = process.env;

let Client: Pool;

const AWS_RDS_ENDPOINT = 'database-1.ch67ubfskttk.eu-west-3.rds.amazonaws.com';

if (ENV?.trim() == 'test') {
  // trim is used to ensure trailing spaces are removed
  Client = new Pool({
    host: AWS_RDS_ENDPOINT, // my aws rds endpoint
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
  console.log(
    `Starting database: ENV=[${ENV}] | database = ${POSTGRES_TEST_DB}`
  );
} else {
  Client = new Pool({
    host: AWS_RDS_ENDPOINT, // my aws rds endpoint
    database: POSTGRES_DEV_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
  console.log(
    `Starting database: ENV=[${ENV}] | database = ${POSTGRES_DEV_DB}`
  );
}

export default Client;
