-- Create ENUM type for order status
CREATE TYPE order_status_enum AS ENUM ('Pending', 'Completed', 'Incomplete', 'Expired');

-- Users Table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    total_balance INTEGER NOT NULL
);

-- Wallets Table
CREATE TABLE Wallets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id),
    public_key VARCHAR(255) NOT NULL,
    private_key VARCHAR(255) NOT NULL,
    blockchain VARCHAR(255) NOT NULL,
    balance INTEGER NOT NULL
);

-- Orders Table
CREATE TABLE Orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id),
    amount INTEGER NOT NULL,
    order_status order_status_enum NOT NULL,
    transaction_hash VARCHAR(255),
    payed_amount INTEGER
);