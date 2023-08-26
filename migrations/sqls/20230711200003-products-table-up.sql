CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  title varchar(255),
  description varchar(1024),
  image_file varchar(30),
  price numeric(10,2),
  category_id integer references categories(id)
);