-- ============================================================
--  GymForge Database Schema
--  CIS2213 Final Project – Back-End Development
-- ============================================================

CREATE DATABASE IF NOT EXISTS gymforge_db;
USE gymforge_db;

-- ─────────────────────────────────────────
-- TABLE: users
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id          INT           AUTO_INCREMENT PRIMARY KEY,
  full_name   VARCHAR(100)  NOT NULL,
  email       VARCHAR(150)  NOT NULL UNIQUE,
  password    VARCHAR(255)  NOT NULL,         -- bcrypt hash
  phone       VARCHAR(30)   DEFAULT NULL,
  gym_name    VARCHAR(150)  DEFAULT NULL,
  city        VARCHAR(80)   DEFAULT NULL,
  created_at  DATETIME      DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────
-- TABLE: machines
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS machines (
  id          INT           AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(150)  NOT NULL,
  category    VARCHAR(80)   NOT NULL,
  brand       VARCHAR(80)   NOT NULL,
  price       DECIMAL(10,2) NOT NULL,
  status      ENUM('Available','Low Stock','Out of Stock') DEFAULT 'Available',
  description TEXT,
  specs       JSON,
  icon        VARCHAR(80)   DEFAULT NULL,
  image       VARCHAR(255)  DEFAULT NULL,
  rating      DECIMAL(3,1)  DEFAULT 0.0,
  reviews     INT           DEFAULT 0
);

-- ─────────────────────────────────────────
-- TABLE: services
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id          INT           AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(150)  NOT NULL,
  category    VARCHAR(80)   NOT NULL,
  price       DECIMAL(10,2) NOT NULL,
  duration    VARCHAR(50)   DEFAULT NULL,
  description TEXT,
  icon        VARCHAR(80)   DEFAULT NULL
);

-- ─────────────────────────────────────────
-- TABLE: bookings  (users 1:M bookings)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
  id            VARCHAR(30)   PRIMARY KEY,          -- e.g. BK-1712345678
  user_id       INT           NOT NULL,
  service_id    INT           NOT NULL,
  machine_name  VARCHAR(150)  NOT NULL,
  booking_date  DATE          NOT NULL,
  booking_time  VARCHAR(20)   NOT NULL,
  notes         TEXT,
  status        ENUM('Confirmed','Cancelled','Completed') DEFAULT 'Confirmed',
  created_at    DATETIME      DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id)    REFERENCES users(id)    ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────
-- TABLE: repair_requests  (users 1:M requests)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS repair_requests (
  id              VARCHAR(30)   PRIMARY KEY,         -- e.g. RQ-1712345678
  user_id         INT           NOT NULL,
  machine_name    VARCHAR(150)  NOT NULL,
  machine_brand   VARCHAR(80)   DEFAULT NULL,
  request_type    VARCHAR(80)   NOT NULL,
  urgency         VARCHAR(30)   DEFAULT NULL,
  description     TEXT,
  preferred_date  DATE          DEFAULT NULL,
  status          ENUM('Pending','In Progress','Resolved') DEFAULT 'Pending',
  created_at      DATETIME      DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────
-- SEED: machines
-- ─────────────────────────────────────────
INSERT INTO machines (name, category, brand, price, status, description, specs, icon, image, rating, reviews) VALUES
('PowerMax Treadmill T900',         'Cardio',       'PowerMax',   850.00, 'Available',    'Heavy-duty commercial treadmill with 20-speed settings, 15% incline, heart rate monitor, and a 3 HP motor suitable for intense daily gym use.',        '{"motor":"3.0 HP","maxSpeed":"20 km/h","incline":"0-15%","weight":"98 kg","capacity":"150 kg"}',   'fa-person-running',    'images/PowerMax Treadmill T900.jpg',          4.8, 24),
('IronCore Smith Machine SM-5',     'Strength',     'IronCore',  1200.00, 'Available',    'Professional-grade Smith machine with linear bearings, integrated weight rack, and safety stops for squats, bench press, and overhead press.',           '{"frameWeight":"210 kg","maxLoad":"300 kg","dimensions":"200x110x220 cm","finish":"Powder Coated","warranty":"5 Years"}', 'fa-dumbbell', 'images/IronCore Smith Machine SM-5.jpg',  4.9, 18),
('XFit Cable Crossover CC-200',     'Strength',     'XFit',      1450.00, 'Available',    'Dual-stack cable crossover machine with 100 kg weight stacks per side, 19 height adjustments, and multiple pulley attachment points.',                  '{"weightEach":"100 kg","adjustments":"19 levels","pulleys":"4 positions","frame":"Heavy Steel","warranty":"3 Years"}',    'fa-weight-hanging',    'images/XFit Cable Crossover CC-200.jpg',       4.7, 12),
('AeroFit Elliptical E-Pro',        'Cardio',       'AeroFit',    680.00, 'Available',    'Low-impact elliptical trainer with 25-resistance levels, large digital display, pulse sensors, and whisper-quiet drive system.',                         '{"resistance":"25 levels","stride":"51 cm","display":"LCD 7\"","capacity":"160 kg","weight":"80 kg"}',                    'fa-ring',              'images/AeroFit Elliptical E-Pro.png',          4.6, 31),
('StrongLife Leg Press LP-400',     'Strength',     'StrongLife', 920.00, 'Low Stock',    '45-degree plate-loaded leg press with angled footplate, full safety system, and oversized carriage for comfortable heavy leg training.',                 '{"angle":"45°","maxLoad":"500 kg","footplate":"48x48 cm","weight":"145 kg","warranty":"2 Years"}',                        'fa-person',            'images/StrongLife Leg Press LP-400 machine.png', 4.5, 9),
('SpinPro Bike SB-600',             'Cardio',       'SpinPro',    420.00, 'Available',    'Indoor cycling bike with magnetic resistance, adjustable handlebars and seat, built-in tablet holder, and sweat guard for intense HIIT sessions.',        '{"resistance":"Magnetic 8-stage","flywheel":"20 kg","saddle":"Adjustable 4-way","display":"Digital","capacity":"130 kg"}','fa-person-biking',     'images/SpinPro Bike SB-600.png',               4.4, 42),
('FlexLine Functional Trainer FT-300','Functional', 'FlexLine',  1800.00, 'Available',    'Dual adjustable pulley functional trainer with 80 kg weight stacks, 24 adjustment points, and a vast range of exercise possibilities.',                 '{"weightEach":"80 kg","adjustments":"24 points","frame":"Steel 4x4cm","finish":"Electrostatic","warranty":"4 Years"}',    'fa-bolt',              'images/FlexLine Functional Trainer FT-300.png',4.9,  7),
('GripMaster Dumbbell Rack DR-50',  'Free Weights', 'GripMaster', 360.00, 'Available',    'Heavy-duty 3-tier dumbbell rack with anti-roll rubber cradles, powder-coated steel, holds dumbbells from 2 kg to 50 kg per set.',                       '{"tiers":"3","capacity":"500 kg total","material":"Steel","finish":"Matte Black","weight":"55 kg"}',                       'fa-hand-fist',         'images/GripMaster Dumbbell Rack DR-50.png',    4.3, 15),
('RecoverPro Massage Chair MC-10',  'Recovery',     'RecoverPro',2200.00, 'Out of Stock', 'Full-body commercial massage chair with 3D rollers, airbag compression, zero-gravity positioning, and 10 automatic massage programs.',                   '{"programs":"10 auto","rollers":"3D","airbags":"50","power":"120W","capacity":"135 kg"}',                                  'fa-spa',               'images/RecoverPro Massage Chair MC-10.png',    4.8,  5);

-- ─────────────────────────────────────────
-- SEED: services
-- ─────────────────────────────────────────
INSERT INTO services (name, category, price, duration, description, icon) VALUES
('Equipment Installation',   'Installation', 75.00,  '2-4 Hours', 'Professional setup and installation of any gym machine or equipment. Includes anchoring, safety check, and a test run with your team.', 'fa-wrench'),
('Preventive Maintenance',   'Maintenance',  50.00,  '1-2 Hours', 'Scheduled inspection, cleaning, lubrication, and adjustment of all moving parts to extend equipment lifespan and prevent breakdowns.',  'fa-shield'),
('Machine Repair',           'Repair',       90.00,  '2-6 Hours', 'Diagnosis and full repair of faulty gym equipment including motor replacement, belt alignment, electronic faults, and frame welding.',     'fa-gears'),
('Equipment Upgrade',        'Upgrade',     110.00,  '2-5 Hours', 'Hardware and software upgrades to existing machines including display panels, control boards, resistance systems, and cable upgrades.',    'fa-arrow-trend-up'),
('Equipment Relocation',     'Installation', 60.00,  '1-3 Hours', 'Safe disassembly, transport, and reassembly of gym equipment within or between facilities, with full re-alignment and safety checks.',    'fa-dolly'),
('Annual Service Package',   'Maintenance', 200.00,  'Yearly',    'All-inclusive yearly maintenance package covering 4 preventive visits, priority repair response, and a 20% discount on parts and labor.',  'fa-box');
