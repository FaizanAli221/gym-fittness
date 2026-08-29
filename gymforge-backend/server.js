// server.js
// GymForge – Express Back-End Entry Point
// CIS2213 Final Project – Semester 202520

require('dotenv').config();

const express       = require('express');
const session       = require('express-session');
const cookieParser  = require('cookie-parser');
const cors          = require('cors');
const path          = require('path');

// ─── Route Handlers ───────────────────────────────────────────
const authRoutes     = require('./routes/auth');
const machineRoutes  = require('./routes/machines');
const serviceRoutes  = require('./routes/services');
const bookingRoutes  = require('./routes/bookings');
const repairRoutes   = require('./routes/repairs');
const profileRoutes  = require('./routes/profile');

// ─── App Initialization ───────────────────────────────────────
const app  = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse cookies from incoming requests
app.use(cookieParser());

// CORS – allow front-end running on a different port to call this API
app.use(cors({
  origin:      'http://localhost:5500',  // Live Server default; adjust if needed
  credentials: true,                     // required to send session cookies cross-origin
}));

// Session middleware – stores session data server-side
app.use(session({
  secret:            process.env.SESSION_SECRET || 'gymforge_secret',
  resave:            false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,    // not accessible via JavaScript (security)
    secure:   false,   // set to true when using HTTPS
    maxAge:   24 * 60 * 60 * 1000,   // default session: 24 hours
    sameSite: 'lax',
  },
}));

// ─── Serve Static Front-End Files ─────────────────────────────
// The gym-project folder sits one level up from this backend folder.
// Express will serve index.html, CSS, JS and images automatically.
app.use(express.static(path.join(__dirname, '..', 'gym-project')));

// ─── API Routes ───────────────────────────────────────────────
app.use('/api', authRoutes);           // /api/register, /api/login, /api/logout, /api/me
app.use('/api/machines',  machineRoutes);
app.use('/api/services',  serviceRoutes);
app.use('/api/bookings',  bookingRoutes);
app.use('/api/repairs',   repairRoutes);
app.use('/api/profile',   profileRoutes);

// ─── Fallback – serve index.html for any unmatched GET request ─
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'gym-project', 'index.html'));
});

// ─── 404 Handler for API routes ───────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// ─── Global Error Handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

// ─── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  GymForge server running at http://localhost:${PORT}`);
  console.log(`📂  Serving static files from: gym-project/`);
  console.log(`🔗  API base: http://localhost:${PORT}/api`);
});
