CREATE TABLE orders_products(
    id SERIAL PRIMARY KEY,
    quantity integer,
    orders_id  bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id),
)