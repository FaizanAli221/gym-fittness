/* =============================================
   GymForge - API Helper (api.js)
   All backend fetch calls go through here.
   Base URL points to Express server.
   ============================================= */

const API_BASE = 'http://localhost:3000/api';

const API = {

  /* ---- Generic fetch wrapper ---- */
  async request(method, endpoint, body = null) {
    const opts = {
      method,
      credentials: 'include',          // send session cookie with every request
      headers: { 'Content-Type': 'application/json' },
    };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(API_BASE + endpoint, opts);
    const data = await res.json();
    return { ok: res.ok, status: res.status, ...data };
  },

  get(endpoint)         { return API.request('GET',    endpoint); },
  post(endpoint, body)  { return API.request('POST',   endpoint, body); },
  del(endpoint)         { return API.request('DELETE', endpoint); },

  /* ---- Auth ---- */
  register(payload)   { return API.post('/register', payload); },
  login(payload)      { return API.post('/login',    payload); },
  logout()            { return API.post('/logout',   {}); },
  me()                { return API.get('/me'); },

  /* ---- Data ---- */
  getMachines(params = {}) {
    const q = new URLSearchParams(params).toString();
    return API.get('/machines' + (q ? '?' + q : ''));
  },
  getMachine(id)      { return API.get('/machines/' + id); },
  getServices()       { return API.get('/services'); },

  /* ---- Bookings ---- */
  getBookings()       { return API.get('/bookings'); },
  createBooking(b)    { return API.post('/bookings', b); },
  cancelBooking(id)   { return API.del('/bookings/' + id); },

  /* ---- Repairs ---- */
  getRepairs()        { return API.get('/repairs'); },
  createRepair(r)     { return API.post('/repairs', r); },
};
