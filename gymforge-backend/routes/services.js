// routes/services.js
// Handles: GET /api/services, GET /api/services/:id

const express = require('express');
const db      = require('../database/db');

const router = express.Router();

// ─────────────────────────────────────────────────────────────
// GET /api/services
// Returns all available services
// ─────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM services ORDER BY id ASC');
    return res.json({ success: true, services: rows });
  } catch (err) {
    console.error('Services fetch error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch services.' });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/services/:id
// Returns a single service by ID
// ─────────────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM services WHERE id = ?', [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    return res.json({ success: true, service: rows[0] });

  } catch (err) {
    console.error('Service by ID error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch service.' });
  }
});

module.exports = router;
