const express = require('express');
const router = express.Router();
const db = require('../db');

// Get sales history (using view)
router.get('/', async (req, res) => {
    try {
        const [sales] = await db.execute('SELECT * FROM vw_sales_summary ORDER BY bill_date DESC');
        res.json(sales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create new bill (Demonstrates Transactions & Stored Procedures)
router.post('/', async (req, res) => {
    const { customer_id, total_amount, discount, final_amount, items } = req.body;
    
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Call Stored Procedure to create Bill
        const [procResults] = await connection.query('CALL GenerateBill(?, ?, ?, ?, @bill_id)', 
            [customer_id, total_amount, discount, final_amount]);
        
        // Get the bill_id from the session variable set in procedure or just get it
        const [[{ bill_id }]] = await connection.query('SELECT LAST_INSERT_ID() as bill_id');

        // 2. Insert Bill Items
        for (const item of items) {
            await connection.execute(
                'INSERT INTO bill_items (bill_id, product_id, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?)',
                [bill_id, item.product_id, item.quantity, item.unit_price, item.subtotal]
            );
            // Note: The trigger 'after_bill_item_insert' will automatically handle stock reduction!
        }

        await connection.commit();
        res.json({ message: 'Bill generated successfully', bill_id });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
});

// Get detailed report (Summary)
router.get('/report', async (req, res) => {
    try {
        const [revenue] = await db.execute('SELECT SUM(final_amount) as total_revenue FROM bills');
        const [topProducts] = await db.execute(`
            SELECT p.name, SUM(bi.quantity) as total_sold 
            FROM bill_items bi 
            JOIN products p ON bi.product_id = p.product_id 
            GROUP BY p.product_id 
            ORDER BY total_sold DESC 
            LIMIT 5
        `);
        res.json({ revenue: revenue[0].total_revenue, topProducts });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
