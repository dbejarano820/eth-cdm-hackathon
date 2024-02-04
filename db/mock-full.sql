-- Insert mock data into Users
INSERT INTO Users (name, email, total_balance) VALUES
('Benja', 'Benja@Benja.com', 500),
('Santi8', 'Santi8@Santi8.com', 0);

-- Insert mock data into Wallets
INSERT INTO Wallets (user_id, public_key, private_key, blockchain, balance) VALUES
(1, '0x9D5A84498e278EB7FecfAcb5F5424304B0437897', '0x3dbfadabf66a325a0d07f669646a8a707ac4d141cdcd39b5abcf08d5c9cc23bf', 'Avalanche', 500),
(2, '0x911634677a3656Fd4FFeC4a0Ddd30c5F7821176a', '0x15611b529c50c46515f1ec1c7dfab524aa3e256385708d1d34510b22d77519bd', 'Avalanche', 0);

-- Assuming order_status_enum has been predefined
-- Insert mock data into Orders
INSERT INTO Orders (user_id, amount, description, payment_url, order_status, transaction_hash, payed_amount, created_at) VALUES
(1, 100, 'Order for user 1', 'http://payment.url/1', 'Pending', 'txHash1', 100, 'Avalanche', CURRENT_TIMESTAMP),
(2, 150, 'Order for user 2', 'http://payment.url/2', 'Completed', 'txHash2', 150, 'Avalanche', CURRENT_TIMESTAMP),
(3, 200, 'Order for user 3', 'http://payment.url/3', 'Incomplete', 'txHash3', 0, 'Avalanche', CURRENT_TIMESTAMP);
