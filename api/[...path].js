// Catch-all so /api/login, /api/machines, etc. invoke the Express app.
// api/index.js only matches /api exactly; without this, Vercel returns NOT_FOUND.
const app = require('../gymforge-backend/server');
module.exports = app;
