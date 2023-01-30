/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARHCAR(64) NOT NULL,
    user_id bigint REFERENCES user(id)
);