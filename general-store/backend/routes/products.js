const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all products (using view)
router.get('/', async (req, res) => {
    try {
        const [products] = await db.execute('SELECT * FROM vw_product_stock');
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get low stock products (using stored procedure)
router.get('/low-stock', async (req, res) => {
    try {
        const [results] = await db.query('CALL GetLowStockProducts(5)');
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add product
router.post('/', async (req, res) => {
    const { name, category_id, price, stock_quantity } = req.body;
    try {
        await db.execute('INSERT INTO products (name, category_id, price, stock_quantity) VALUES (?, ?, ?, ?)', 
            [name, category_id, price, stock_quantity]);
        res.json({ message: 'Product added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update product
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, category_id, price, stock_quantity } = req.body;
    try {
        await db.execute('UPDATE products SET name = ?, category_id = ?, price = ?, stock_quantity = ? WHERE product_id = ?', 
            [name, category_id, price, stock_quantity, id]);
        res.json({ message: 'Product updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete product
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM products WHERE product_id = ?', [id]);
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
