USE general_store;

-- Categories
INSERT INTO categories (category_name) VALUES ('Groceries'), ('Electronics'), ('Clothing'), ('Home Decor'), ('Stationery');

-- Products
INSERT INTO products (name, category_id, price, stock_quantity) VALUES 
('Milk 1L', 1, 150.00, 50),
('Bread', 1, 80.00, 30),
('Eggs 12pcs', 1, 300.00, 20),
('USB Mouse', 2, 800.00, 15),
('Keyboard', 2, 1500.00, 10),
('T-Shirt', 3, 1200.00, 25),
('Jeans', 3, 2500.00, 12),
('Vase', 4, 3500.00, 4), -- Low stock
('Notebook', 5, 100.00, 100),
('Pen', 5, 20.00, 200);

-- Customers
INSERT INTO customers (name, phone, email) VALUES 
('John Doe', '03001234567', 'john@example.com'),
('Jane Smith', '03119876543', 'jane@example.com'),
('Alice Brown', '03225554433', 'alice@example.com'),
('Bob Johnson', '03331112233', 'bob@example.com'),
('Charlie Davis', '03449998877', 'charlie@example.com');

-- Users (admin123, cashier123)
-- Real BCrypt hashes for the passwords
INSERT INTO users (username, password_hash, role) VALUES 
('admin', '$2b$10$ENo1Ut7VUbRwL3zvwR370OMFHolyIr1s1qaVAKeB4lUxAWFvUSlsy', 'admin'),
('cashier', '$2b$10$QTro25/MDZyZ8g3t3Vvg5OYC06PT2ba59Gd0bjBMLnYQPCXJqhVqy', 'cashier');

-- Sample Bills
INSERT INTO bills (customer_id, total_amount, discount, final_amount) VALUES 
(1, 450.00, 50.00, 400.00),
(2, 2300.00, 0.00, 2300.00);

-- Sample Bill Items
INSERT INTO bill_items (bill_id, product_id, quantity, unit_price, subtotal) VALUES 
(1, 1, 1, 150.00, 150.00),
(1, 3, 1, 300.00, 300.00),
(2, 4, 1, 800.00, 800.00),
(2, 5, 1, 1500.00, 1500.00);
