/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES product(id),
    quantity integer,
    status VARHCAR(64) NOT NULL,
    user_id bigint REFERENCES user(id)
);