USE general_store;

-- View for sales summary
CREATE VIEW vw_sales_summary AS
SELECT 
    b.bill_id,
    c.name AS customer_name,
    b.total_amount,
    b.discount,
    b.final_amount,
    b.bill_date,
    COUNT(bi.item_id) AS total_items
FROM bills b
LEFT JOIN customers c ON b.customer_id = c.customer_id
LEFT JOIN bill_items bi ON b.bill_id = bi.bill_id
GROUP BY b.bill_id;

-- View for detailed product stock
CREATE VIEW vw_product_stock AS
SELECT 
    p.product_id,
    p.name,
    c.category_name,
    p.price,
    p.stock_quantity
FROM products p
JOIN categories c ON p.category_id = c.category_id;
