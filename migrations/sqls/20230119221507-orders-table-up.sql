CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES products(id),
    quantity integer,
    status VARCHAR(64) NOT NULL,
    user_id bigint REFERENCES users(id)
);