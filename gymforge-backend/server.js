// server.js
// GymForge – Express Back-End Entry Point

require('dotenv').config();

const express       = require('express');
const session       = require('express-session');
const cookieParser  = require('cookie-parser');
const cors          = require('cors');
const path          = require('path');
const fs            = require('fs');

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

// CORS – support cross-origin requests
app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true,
}));

// Session middleware
app.use(session({
  secret:            process.env.SESSION_SECRET || 'gymforge_secret_key_2025',
  resave:            false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure:   process.env.VERCEL === '1',
    maxAge:   24 * 60 * 60 * 1000,
    sameSite: 'lax',
  },
}));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'GymForge API is running.' });
});

// ─── API Routes ───────────────────────────────────────────────
app.use('/api', authRoutes);           // /api/register, /api/login, /api/logout, /api/me
app.use('/api/machines',  machineRoutes);
app.use('/api/services',  serviceRoutes);
app.use('/api/bookings',  bookingRoutes);
app.use('/api/repairs',   repairRoutes);
app.use('/api/profile',   profileRoutes);

// ─── 404 Handler for unmatched API routes ────────────────────
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found.' });
});

// ─── Serve Static Front-End Files ─────────────────────────────
// Locally Express can serve these. On Vercel, express.static() is ignored —
// put the same files in /public so the CDN serves them (avoids NOT_FOUND).
const publicDir = path.join(__dirname, '..', 'public');
const gymDir    = path.join(__dirname, '..', 'gym-project');
const staticRoot = fs.existsSync(path.join(publicDir, 'index.html')) ? publicDir : gymDir;

app.use(express.static(staticRoot));

// ─── Fallback – serve index.html for unmatched GET requests ───
app.get('*', (req, res) => {
  res.sendFile(path.join(staticRoot, 'index.html'));
});

// ─── Global Error Handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack || err);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

// ─── Start Server (when run directly) ─────────────────────────
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅  GymForge server running at http://localhost:${PORT}`);
    console.log(`📂  Serving static files from: ${staticRoot}`);
    console.log(`🔗  API base: http://localhost:${PORT}/api`);
  });
}

module.exports = app;
