// routes/bookings.js
// Handles: GET /api/bookings, POST /api/bookings, DELETE /api/bookings/:id
// All routes require the user to be logged in (requireAuth middleware)

const express = require('express');
const db      = require('../database/db');

const router = express.Router();

// ─────────────────────────────────────────────────────────────
// Middleware: requireAuth
// Checks if the user has an active session before proceeding
// ─────────────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ success: false, message: 'You must be logged in to perform this action.' });
  }
  next();
}

// ─────────────────────────────────────────────────────────────
// GET /api/bookings
// Returns all bookings for the logged-in user
// ─────────────────────────────────────────────────────────────
router.get('/', requireAuth, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT b.*, s.name AS service_name, s.price AS service_price, s.icon AS service_icon
       FROM bookings b
       JOIN services s ON b.service_id = s.id
       WHERE b.user_id = ?
       ORDER BY b.created_at DESC`,
      [req.session.userId]
    );

    return res.json({ success: true, bookings: rows });

  } catch (err) {
    console.error('Get bookings error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch bookings.' });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/bookings
// Creates a new service booking for the logged-in user
// ─────────────────────────────────────────────────────────────
router.post('/', requireAuth, async (req, res) => {
  const { serviceId, machineName, bookingDate, bookingTime, notes } = req.body;

  if (!serviceId || !machineName || !bookingDate || !bookingTime) {
    return res.status(400).json({ success: false, message: 'Service, machine name, date and time are required.' });
  }

  try {
    // Verify the service exists
    const [svc] = await db.query('SELECT id FROM services WHERE id = ?', [serviceId]);
    if (svc.length === 0) {
      return res.status(404).json({ success: false, message: 'Selected service not found.' });
    }

    const bookingId = 'BK-' + Date.now();

    await db.query(
      'INSERT INTO bookings (id, user_id, service_id, machine_name, booking_date, booking_time, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [bookingId, req.session.userId, serviceId, machineName, bookingDate, bookingTime, notes || null]
    );

    return res.status(201).json({
      success: true,
      message: 'Booking confirmed successfully.',
      bookingId,
    });

  } catch (err) {
    console.error('Create booking error:', err);
    return res.status(500).json({ success: false, message: 'Failed to create booking.' });
  }
});

// ─────────────────────────────────────────────────────────────
// DELETE /api/bookings/:id
// Cancels a booking (sets status to 'Cancelled')
// Only the owner of the booking can cancel it
// ─────────────────────────────────────────────────────────────
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    // Confirm booking belongs to this user
    const [rows] = await db.query(
      'SELECT id, status FROM bookings WHERE id = ? AND user_id = ?',
      [req.params.id, req.session.userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    if (rows[0].status === 'Cancelled') {
      return res.status(400).json({ success: false, message: 'Booking is already cancelled.' });
    }

    await db.query('UPDATE bookings SET status = ? WHERE id = ?', ['Cancelled', req.params.id]);

    return res.json({ success: true, message: 'Booking cancelled successfully.' });

  } catch (err) {
    console.error('Cancel booking error:', err);
    return res.status(500).json({ success: false, message: 'Failed to cancel booking.' });
  }
});

module.exports = router;
