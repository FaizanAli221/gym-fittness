// routes/machines.js
// Handles: GET /api/machines, GET /api/machines/:id

const express = require('express');
const db      = require('../database/db');

const router = express.Router();

// ─────────────────────────────────────────────────────────────
// GET /api/machines
// Returns all machines (with optional filters)
// Query params: category, status, search
// ─────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { category, status, search } = req.query;

    let query  = 'SELECT * FROM machines WHERE 1=1';
    const params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    if (search) {
      query += ' AND (name LIKE ? OR brand LIKE ? OR description LIKE ?)';
      const like = `%${search}%`;
      params.push(like, like, like);
    }

    query += ' ORDER BY id ASC';

    const [rows] = await db.query(query, params);
    return res.json({ success: true, machines: rows });

  } catch (err) {
    console.error('Machines fetch error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch machines.' });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/machines/:id
// Returns a single machine by ID
// ─────────────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM machines WHERE id = ?', [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Machine not found.' });
    }

    return res.json({ success: true, machine: rows[0] });

  } catch (err) {
    console.error('Machine by ID error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch machine.' });
  }
});

module.exports = router;
