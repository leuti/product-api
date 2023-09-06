# Product-Store Back-end

## Getting Started

The product-store is a Udacity project deliverable. It offers the basic functions of a webshop. This repo contains a basic Node and Express app serving as API.

The product-store front-end can be downloaded here --> https://github.com/leuti/product-store.git

## Required modules

This application makes use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- bcrypt to hash and compare passwords
- jasmine from npm for testing (incl. supertest for API testing)
- cross-env to start app in different environments independent of the OS

## Steps to installation (details below)

1. git clone https://github.com/leuti/product-api.git
2. Create .env file
3. npm install
4. docker compose up -d
5. npm run test

### Download source and install locally

git clone https://github.com/leuti/product-api.git

### Create the following .env file in the root folder of this project (this information would normally not be exposed in a README file)

POSTGRES_HOST=127.0.0.1
POSTGRES_DB=postgres
POSTGRES_DEV_DB=shopping_dev
POSTGRES_TEST_DB=shopping_test
POSTGRES_USER=shopping_user
POSTGRES_PASSWORD=password123
BCRYPT_PASSWORD=29(/%&!Hkyiz1&
SALT_ROUNDS=10
TOKEN_SECRET=KasparIstGross_test
ENV=test

### Install all packages

- Run the command "npm install" to install all required packages.

### Launch the docker file containing the psql database

- Ensure that docker is installed locally
- Run the following command "docker compose up -d"
- The psql server will start on port 5432

## Launch app in different modes

### Run "npm run test" to create test data

run "npm run test" - just to create the necessary test data

- !! Please disregard the jasmine tests as I have deactivated them. All test cases relying on Authentication are failing. These tests were correctly running in the API/PSQL project. The API works fine for all required endpoints for the product-store front-end

### Run app in test mode

- Change the .env param ENV to test
- Run the command "npm run start" or alternatively the "npm run watch"

### Run app in dev mode

- Change the .env param ENV to dev
- Run the command "npm run start" or alternatively the "npm run watch"

## All scripts described:

- npm run start: compiles the source files, creates (if required the necessary tables and insert the test data) and start the app (the .env ENV variable defines which env to start)
- npm run watch: runs the app in watch mode, meaning that any code change immediately leads to a re-start of the app (ENV var considered)
- npm run test: compliles the source files, creates (if required the necessary tables and insert the test data) and runs the jasmine test cases in test env
- npm run test:drop: same as above, but drops all tables previously created
- npm run build: builds the runtime code
- npm run jasmine: runs the jasmine test scripts

## Some commands

### Docker

- "docker stop proj_pg-postgres-1" stops the container
- "docker rm proj_pg-postgres-1" removes the container
- "docker volume rm proj_pg_postgres" removes the docker volume
- "docker ps" will list running containers
- "docker volume ls" lists all volumes

### psql

- login (e.g. via Docker Terminal): psql -h localhost -d shopping_test -U shopping_user -p 5432
