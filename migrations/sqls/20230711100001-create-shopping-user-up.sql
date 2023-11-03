-- Create user
CREATE USER shopping_user WITH PASSWORD 'password123';

-- create development database and grant access
CREATE DATABASE shopping_dev;
GRANT ALL PRIVILEGES ON DATABASE shopping_dev TO shopping_user;

-- create test database and grant access
CREATE DATABASE shopping_test;
GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;