# Prepare aws database

## Create psql database instance on amazon web services (aws)

## Create shopping user and database

Goal: The shopping_user must be owner of both databases and the public schema.

- Log into the database using the following command:
  psql -h database-1.chhg8l37c6tv.eu-central-1.rds.amazonaws.com -U postgres postgres

- Create the shopping user and database:
  CREATE USER shopping_user WITH PASSWORD 'password123';
  ALTER ROLE shopping_user CREATEDB;

  CREATE DATABASE shopping_dev;
  CREATE DATABASE shopping_test;

- Change OWNER of schema 'public'
  ALTER DEFAULT PRIVILEGES IN SCHEMA public FOR ROLE shopping_user GRANT ALL ON TABLES TO shopping_user;

## Create the Elastic beanstalk environment in aws

## Deployment

- Save all changes. but don't commit yet
- Run "npm run zip" (run in git bash) --> will create new app.zip file
- Select the Elastic Beanstalk environment and press the "Upload and deploy" button
- Select the app.zip file just created --> Deploy
- Commit changes (add version from EB as reference)
