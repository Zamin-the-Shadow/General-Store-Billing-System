USE general_store;

DELIMITER //

-- Trigger to decrease stock after a sale
CREATE TRIGGER after_bill_item_insert
AFTER INSERT ON bill_items
FOR EACH ROW
BEGIN
    UPDATE products 
    SET stock_quantity = stock_quantity - NEW.quantity
    WHERE product_id = NEW.product_id;
END //

-- Trigger to log product updates
CREATE TRIGGER after_product_update
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (table_name, action, details)
    VALUES ('products', 'UPDATE', CONCAT('Product ID: ', OLD.product_id, ' Name: ', OLD.name, ' Old Stock: ', OLD.stock_quantity, ' New Stock: ', NEW.stock_quantity));
END //

-- Trigger to log product deletions
CREATE TRIGGER after_product_delete
AFTER DELETE ON products
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (table_name, action, details)
    VALUES ('products', 'DELETE', CONCAT('Product ID: ', OLD.product_id, ' Name: ', OLD.name));
END //

DELIMITER ;
