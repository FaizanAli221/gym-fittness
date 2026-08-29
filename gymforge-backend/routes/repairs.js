// routes/repairs.js
// Handles: GET /api/repairs, POST /api/repairs
// All routes require the user to be logged in

const express = require('express');
const db      = require('../database/db');

const router = express.Router();

// ─────────────────────────────────────────────────────────────
// Middleware: requireAuth
// ─────────────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ success: false, message: 'You must be logged in to perform this action.' });
  }
  next();
}

// ─────────────────────────────────────────────────────────────
// GET /api/repairs
// Returns all repair requests for the logged-in user
// ─────────────────────────────────────────────────────────────
router.get('/', requireAuth, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM repair_requests WHERE user_id = ? ORDER BY created_at DESC',
      [req.session.userId]
    );
    return res.json({ success: true, requests: rows });
  } catch (err) {
    console.error('Get repairs error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch repair requests.' });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/repairs
// Submits a new repair/maintenance request
// ─────────────────────────────────────────────────────────────
router.post('/', requireAuth, async (req, res) => {
  const { machineName, machineBrand, requestType, urgency, description, preferredDate } = req.body;

  if (!machineName || !requestType) {
    return res.status(400).json({ success: false, message: 'Machine name and request type are required.' });
  }

  try {
    const requestId = 'RQ-' + Date.now();

    await db.query(
      `INSERT INTO repair_requests
         (id, user_id, machine_name, machine_brand, request_type, urgency, description, preferred_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        requestId,
        req.session.userId,
        machineName,
        machineBrand || null,
        requestType,
        urgency || null,
        description || null,
        preferredDate || null,
      ]
    );

    return res.status(201).json({
      success: true,
      message: 'Repair request submitted successfully.',
      requestId,
    });

  } catch (err) {
    console.error('Create repair error:', err);
    return res.status(500).json({ success: false, message: 'Failed to submit repair request.' });
  }
});

module.exports = router;
