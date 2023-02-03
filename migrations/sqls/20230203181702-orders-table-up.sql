CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(64) NOT NULL,
    user_id bigint REFERENCES users(id)
)