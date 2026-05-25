USE general_store;

DELIMITER //

-- Procedure to generate a bill with items (Demonstrates Transactions)
CREATE PROCEDURE GenerateBill(
    IN p_customer_id INT,
    IN p_total_amount DECIMAL(10, 2),
    IN p_discount DECIMAL(10, 2),
    IN p_final_amount DECIMAL(10, 2),
    OUT p_bill_id INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        INSERT INTO bills (customer_id, total_amount, discount, final_amount)
        VALUES (p_customer_id, p_total_amount, p_discount, p_final_amount);
        
        SET p_bill_id = LAST_INSERT_ID();
    COMMIT;
END //

-- Procedure to get low stock products
CREATE PROCEDURE GetLowStockProducts(IN p_threshold INT)
BEGIN
    SELECT p.product_id, p.name, p.stock_quantity, c.category_name
    FROM products p
    JOIN categories c ON p.category_id = c.category_id
    WHERE p.stock_quantity < p_threshold;
END //

DELIMITER ;
