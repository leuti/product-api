CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(id),
  status varchar(10)
)
