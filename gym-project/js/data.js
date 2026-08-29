/* =============================================
   GymForge - Mock Data (data.js)
   Simulates database records for front-end
   ============================================= */

const GF_DATA = {

  machines: [
    {
      id: 1,
      name: 'PowerMax Treadmill T900',
      category: 'Cardio',
      brand: 'PowerMax',
      price: 850.00,
      status: 'Available',
      description: 'Heavy-duty commercial treadmill with 20-speed settings, 15% incline, heart rate monitor, and a 3 HP motor suitable for intense daily gym use.',
      specs: { motor: '3.0 HP', maxSpeed: '20 km/h', incline: '0–15%', weight: '98 kg', capacity: '150 kg' },
      icon: 'fa-person-running',
      image: 'images/PowerMax Treadmill T900.jpg',
      rating: 4.8,
      reviews: 24,
    },
    {
      id: 2,
      name: 'IronCore Smith Machine SM-5',
      category: 'Strength',
      brand: 'IronCore',
      price: 1200.00,
      status: 'Available',
      description: 'Professional-grade Smith machine with linear bearings, integrated weight rack, and safety stops for squats, bench press, and overhead press.',
      specs: { frameWeight: '210 kg', maxLoad: '300 kg', dimensions: '200×110×220 cm', finish: 'Powder Coated', warranty: '5 Years' },
      icon: 'fa-dumbbell',
      image: 'images/IronCore Smith Machine SM-5.jpg',
      rating: 4.9,
      reviews: 18,
    },
    {
      id: 3,
      name: 'XFit Cable Crossover CC-200',
      category: 'Strength',
      brand: 'XFit',
      price: 1450.00,
      status: 'Available',
      description: 'Dual-stack cable crossover machine with 100 kg weight stacks per side, 19 height adjustments, and multiple pulley attachment points.',
      specs: { weightEach: '100 kg', adjustments: '19 levels', pulleys: '4 positions', frame: 'Heavy Steel', warranty: '3 Years' },
      icon: 'fa-weight-hanging',
      image: 'images/XFit Cable Crossover CC-200.jpg',
      rating: 4.7,
      reviews: 12,
    },
    {
      id: 4,
      name: 'AeroFit Elliptical E-Pro',
      category: 'Cardio',
      brand: 'AeroFit',
      price: 680.00,
      status: 'Available',
      description: 'Low-impact elliptical trainer with 25-resistance levels, large digital display, pulse sensors, and whisper-quiet drive system.',
      specs: { resistance: '25 levels', stride: '51 cm', display: 'LCD 7"', capacity: '160 kg', weight: '80 kg' },
      icon: 'fa-ring',
      image: 'images/AeroFit Elliptical E-Pro.png',
      rating: 4.6,
      reviews: 31,
    },
    {
      id: 5,
      name: 'StrongLife Leg Press LP-400',
      category: 'Strength',
      brand: 'StrongLife',
      price: 920.00,
      status: 'Low Stock',
      description: '45-degree plate-loaded leg press with angled footplate, full safety system, and oversized carriage for comfortable heavy leg training.',
      specs: { angle: '45°', maxLoad: '500 kg', footplate: '48×48 cm', weight: '145 kg', warranty: '2 Years' },
      icon: 'fa-person',
      image: 'images/StrongLife Leg Press LP-400 machine.png',
      rating: 4.5,
      reviews: 9,
    },
    {
      id: 6,
      name: 'SpinPro Bike SB-600',
      category: 'Cardio',
      brand: 'SpinPro',
      price: 420.00,
      status: 'Available',
      description: 'Indoor cycling bike with magnetic resistance, adjustable handlebars and seat, built-in tablet holder, and sweat guard for intense HIIT sessions.',
      specs: { resistance: 'Magnetic 8-stage', flywheel: '20 kg', saddle: 'Adjustable 4-way', display: 'Digital', capacity: '130 kg' },
      icon: 'fa-person-biking',
      image: 'images/SpinPro Bike SB-600.png',
      rating: 4.4,
      reviews: 42,
    },
    {
      id: 7,
      name: 'FlexLine Functional Trainer FT-300',
      category: 'Functional',
      brand: 'FlexLine',
      price: 1800.00,
      status: 'Available',
      description: 'Dual adjustable pulley functional trainer with 80 kg weight stacks, 24 adjustment points, and a vast range of exercise possibilities.',
      specs: { weightEach: '80 kg', adjustments: '24 points', frame: 'Steel 4×4cm', finish: 'Electrostatic', warranty: '4 Years' },
      icon: 'fa-bolt',
      image: 'images/FlexLine Functional Trainer FT-300.png',
      rating: 4.9,
      reviews: 7,
    },
    {
      id: 8,
      name: 'GripMaster Dumbbell Rack DR-50',
      category: 'Free Weights',
      brand: 'GripMaster',
      price: 360.00,
      status: 'Available',
      description: 'Heavy-duty 3-tier dumbbell rack with anti-roll rubber cradles, powder-coated steel, holds dumbbells from 2 kg to 50 kg per set.',
      specs: { tiers: '3', capacity: '500 kg total', material: 'Steel', finish: 'Matte Black', weight: '55 kg' },
      icon: 'fa-hand-fist',
      image: 'images/GripMaster Dumbbell Rack DR-50.png',
      rating: 4.3,
      reviews: 15,
    },
    {
      id: 9,
      name: 'RecoverPro Massage Chair MC-10',
      category: 'Recovery',
      brand: 'RecoverPro',
      price: 2200.00,
      status: 'Out of Stock',
      description: 'Full-body commercial massage chair with 3D rollers, airbag compression, zero-gravity positioning, and 10 automatic massage programs.',
      specs: { programs: '10 auto', rollers: '3D', airbags: '50', power: '120W', capacity: '135 kg' },
      icon: 'fa-spa',
      image: 'images/RecoverPro Massage Chair MC-10.png',
      rating: 4.8,
      reviews: 5,
    },
  ],

  services: [
    {
      id: 1,
      name: 'Equipment Installation',
      category: 'Installation',
      price: 75.00,
      duration: '2–4 Hours',
      description: 'Professional setup and installation of any gym machine or equipment. Includes anchoring, safety check, and a test run with your team.',
      icon: 'fa-wrench',
    },
    {
      id: 2,
      name: 'Preventive Maintenance',
      category: 'Maintenance',
      price: 50.00,
      duration: '1–2 Hours',
      description: 'Scheduled inspection, cleaning, lubrication, and adjustment of all moving parts to extend equipment lifespan and prevent breakdowns.',
      icon: 'fa-shield',
    },
    {
      id: 3,
      name: 'Machine Repair',
      category: 'Repair',
      price: 90.00,
      duration: '2–6 Hours',
      description: 'Diagnosis and full repair of faulty gym equipment including motor replacement, belt alignment, electronic faults, and frame welding.',
      icon: 'fa-gears',
    },
    {
      id: 4,
      name: 'Equipment Upgrade',
      category: 'Upgrade',
      price: 110.00,
      duration: '2–5 Hours',
      description: 'Hardware and software upgrades to existing machines including display panels, control boards, resistance systems, and cable upgrades.',
      icon: 'fa-arrow-trend-up',
    },
    {
      id: 5,
      name: 'Equipment Relocation',
      category: 'Installation',
      price: 60.00,
      duration: '1–3 Hours',
      description: 'Safe disassembly, transport, and reassembly of gym equipment within or between facilities, with full re-alignment and safety checks.',
      icon: 'fa-dolly',
    },
    {
      id: 6,
      name: 'Annual Service Package',
      category: 'Maintenance',
      price: 200.00,
      duration: 'Yearly',
      description: 'All-inclusive yearly maintenance package covering 4 preventive visits, priority repair response, and a 20% discount on parts and labor.',
      icon: 'fa-box',
    },
  ],

  /* Registered users (simulating DB, stored in localStorage for demo) */
  getUsers() {
    try { return JSON.parse(localStorage.getItem('gf_users')) || []; } catch { return []; }
  },
  saveUsers(arr) {
    localStorage.setItem('gf_users', JSON.stringify(arr));
  },
  addUser(user) {
    const users = GF_DATA.getUsers();
    users.push({ ...user, id: Date.now(), bookings: [], requests: [] });
    GF_DATA.saveUsers(users);
  },
  findUser(email, password) {
    return GF_DATA.getUsers().find(u => u.email === email && u.password === password) || null;
  },
  findUserByEmail(email) {
    return GF_DATA.getUsers().find(u => u.email === email) || null;
  },
  updateUser(id, changes) {
    const users = GF_DATA.getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx !== -1) { Object.assign(users[idx], changes); GF_DATA.saveUsers(users); return users[idx]; }
    return null;
  },

  /* Bookings stored in localStorage */
  getBookings() {
    try { return JSON.parse(localStorage.getItem('gf_bookings')) || []; } catch { return []; }
  },
  saveBookings(arr) { localStorage.setItem('gf_bookings', JSON.stringify(arr)); },
  addBooking(b) {
    const list = GF_DATA.getBookings();
    list.push({ ...b, id: 'BK-' + Date.now(), createdAt: new Date().toISOString(), status: 'Confirmed' });
    GF_DATA.saveBookings(list);
  },
  cancelBooking(id) {
    const list = GF_DATA.getBookings();
    const idx = list.findIndex(b => b.id === id);
    if (idx !== -1) { list[idx].status = 'Cancelled'; GF_DATA.saveBookings(list); }
  },
  getUserBookings(userId) {
    return GF_DATA.getBookings().filter(b => b.userId === userId);
  },

  /* Repair Requests */
  getRequests() {
    try { return JSON.parse(localStorage.getItem('gf_requests')) || []; } catch { return []; }
  },
  saveRequests(arr) { localStorage.setItem('gf_requests', JSON.stringify(arr)); },
  addRequest(r) {
    const list = GF_DATA.getRequests();
    list.push({ ...r, id: 'RQ-' + Date.now(), createdAt: new Date().toISOString(), status: 'Pending' });
    GF_DATA.saveRequests(list);
  },
  getUserRequests(userId) {
    return GF_DATA.getRequests().filter(r => r.userId === userId);
  },
};
