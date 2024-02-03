CREATE TABLE Users (
    id VARCHAR(255) PRIMARY KEY,
    correo VARCHAR(255) NOT NULL,
    total_balance INTEGER NOT NULL
);

CREATE TABLE Wallets (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES Users(id),
    public_key VARCHAR(255) NOT NULL,
    private_key VARCHAR(255) NOT NULL,
    blockchain VARCHAR(255) NOT NULL,
    balance INTEGER NOT NULL
);

CREATE TABLE OrderStatus (
    id VARCHAR(255) PRIMARY KEY,
    label VARCHAR(255) NOT NULL
);

CREATE TABLE Orders (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES Users(id),
    amount INTEGER NOT NULL,
    order_status VARCHAR(255) REFERENCES OrderStatus(id),
    transaction_hash VARCHAR(255) NOT NULL,
    payed_amount INTEGER NOT NULL
);

INSERT INTO OrderStatus (id, label) VALUES
    ('pending', 'Pending'),
    ('completed', 'Completed'),
    ('incomplete', 'Imcomplete'),
    ('expired', 'expired');