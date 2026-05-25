const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all customers
router.get('/', async (req, res) => {
    try {
        const [customers] = await db.execute('SELECT * FROM customers');
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add customer
router.post('/', async (req, res) => {
    const { name, phone, email } = req.body;
    try {
        await db.execute('INSERT INTO customers (name, phone, email) VALUES (?, ?, ?)', [name, phone, email]);
        res.json({ message: 'Customer added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
