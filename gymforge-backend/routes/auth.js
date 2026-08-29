// routes/auth.js
// Handles: POST /api/register, POST /api/login, POST /api/logout, GET /api/me

const express = require('express');
const bcrypt  = require('bcryptjs');
const db      = require('../database/db');

const router = express.Router();

// ─────────────────────────────────────────────────────────────
// POST /api/register
// Creates a new user account
// ─────────────────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  const { fullName, email, password, phone, gymName, city } = req.body;

  // Basic validation
  if (!fullName || !email || !password) {
    return res.status(400).json({ success: false, message: 'Full name, email and password are required.' });
  }

  try {
    // Check if email already exists
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await db.query(
      'INSERT INTO users (full_name, email, password, phone, gym_name, city) VALUES (?, ?, ?, ?, ?, ?)',
      [fullName, email, hashedPassword, phone || null, gymName || null, city || null]
    );

    // Auto-login after registration: create session
    req.session.userId   = result.insertId;
    req.session.userEmail = email;
    req.session.userName  = fullName;

    // Set a persistent welcome cookie (non-session)
    res.cookie('gf_welcome', fullName, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: false,                   // readable by JS for welcome message
      sameSite: 'lax',
    });

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      user: { id: result.insertId, fullName, email, gymName, city },
    });

  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/login
// Authenticates user and creates session
// ─────────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password, remember } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  try {
    // Find user by email
    const [rows] = await db.query(
      'SELECT id, full_name, email, password, phone, gym_name, city FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const user = rows[0];

    // Compare password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Create session
    req.session.userId    = user.id;
    req.session.userEmail = user.email;
    req.session.userName  = user.full_name;

    // "Remember me" → extend session cookie lifetime
    if (remember) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
      res.cookie('gf_remember', email, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        sameSite: 'lax',
      });
    }

    return res.json({
      success: true,
      message: 'Login successful.',
      user: {
        id:       user.id,
        fullName: user.full_name,
        email:    user.email,
        phone:    user.phone,
        gymName:  user.gym_name,
        city:     user.city,
      },
    });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/logout
// Destroys the session and clears cookies
// ─────────────────────────────────────────────────────────────
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed.' });
    }
    res.clearCookie('connect.sid');   // default express-session cookie name
    res.clearCookie('gf_remember');
    return res.json({ success: true, message: 'Logged out successfully.' });
  });
});

// ─────────────────────────────────────────────────────────────
// GET /api/me
// Returns the currently logged-in user (for front-end checks)
// ─────────────────────────────────────────────────────────────
router.get('/me', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ success: false, message: 'Not logged in.' });
  }

  try {
    const [rows] = await db.query(
      'SELECT id, full_name, email, phone, gym_name, city, created_at FROM users WHERE id = ?',
      [req.session.userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const u = rows[0];
    return res.json({
      success: true,
      user: {
        id:        u.id,
        fullName:  u.full_name,
        email:     u.email,
        phone:     u.phone,
        gymName:   u.gym_name,
        city:      u.city,
        createdAt: u.created_at,
      },
    });
  } catch (err) {
    console.error('Me error:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
