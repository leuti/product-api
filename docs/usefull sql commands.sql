-- Show owner of each database
SELECT datname AS "Database Name", pg_roles.rolname AS "Owner" FROM pg_database JOIN pg_roles ON pg_database.datdba = pg_roles.oid;

-- Alter owner of database
ALTER DATABASE shopping_dev OWNER TO shopping_user;

-- Show for each table the corresponding schema
SELECT table_name, table_schema FROM information_schema.tables WHERE table_schema NOT IN ('information_schema', 'pg_catalog') ORDER BY table_name;

-- Show owner of public schema
SELECT n.nspname AS "Schema", pg_catalog.pg_get_userbyid(n.nspowner) AS "Owner" FROM pg_catalog.pg_namespace n WHERE n.nspname = 'public';

-- Alter owner of schema
ALTER SCHEMA public OWNER TO shopping_user;

-- 
SELECT rolname AS "Role Name", rolsuper AS "Superuser", rolinherit AS "Inherits Roles", rolcreaterole AS "Can Create Roles", rolcreatedb AS "Can Create Databases", rolcanlogin AS "Can Login" FROM pg_roles;



