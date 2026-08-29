// routes/profile.js
// Handles: PUT /api/profile  (update name, phone, gymName, city)

const express = require('express');
const db      = require('../database/db');

const router = express.Router();

function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ success: false, message: 'Not logged in.' });
  }
  next();
}

// PUT /api/profile
router.put('/', requireAuth, async (req, res) => {
  const { fullName, phone, gymName, city } = req.body;

  if (!fullName || fullName.trim().length < 3) {
    return res.status(400).json({ success: false, message: 'Full name must be at least 3 characters.' });
  }

  try {
    await db.query(
      'UPDATE users SET full_name = ?, phone = ?, gym_name = ?, city = ? WHERE id = ?',
      [fullName.trim(), phone || null, gymName || null, city || null, req.session.userId]
    );

    // Update session name so navbar stays in sync
    req.session.userName = fullName.trim();

    return res.json({ success: true, message: 'Profile updated successfully.' });
  } catch (err) {
    console.error('Profile update error:', err);
    return res.status(500).json({ success: false, message: 'Failed to update profile.' });
  }
});

module.exports = router;
