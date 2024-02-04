-- Insert mock data into Users
INSERT INTO Users (name, email, total_balance) VALUES
('user1', 'user1@example.com', 1000),
('user2', 'user2@example.com', 1500),
('user3', 'user3@example.com', 2000);

-- Insert mock data into Wallets
INSERT INTO Wallets (user_id, public_key, private_key, blockchain, balance) VALUES
(1, 'pubKey1', 'privKey1', 'Avalanche', 500),
(2, 'pubKey2', 'privKey2', 'Avalanche', 750),
(3, 'pubKey3', 'privKey3', 'Avalanche', 300);

-- Assuming order_status_enum has been predefined
-- Insert mock data into Orders
INSERT INTO Orders (user_id, amount, description, payment_url, order_status, transaction_hash, payed_amount, created_at) VALUES
(1, 100, 'Order for user 1', 'http://payment.url/1', 'Pending', 'txHash1', 100, 'Avalanche', CURRENT_TIMESTAMP),
(2, 150, 'Order for user 2', 'http://payment.url/2', 'Completed', 'txHash2', 150, 'Avalanche', CURRENT_TIMESTAMP),
(3, 200, 'Order for user 3', 'http://payment.url/3', 'Incomplete', 'txHash3', 0, 'Avalanche', CURRENT_TIMESTAMP);