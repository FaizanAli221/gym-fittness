-- ═══════════════════════════════════════════════════════════════
-- GymForge — seed.sql (FIXED - no JSON escape issues)
-- Run in MySQL Workbench to populate machines + services
-- Safe to re-run anytime
-- ═══════════════════════════════════════════════════════════════

USE gymforge_db;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE machines;
TRUNCATE TABLE services;
SET FOREIGN_KEY_CHECKS = 1;

-- MACHINES --

INSERT INTO machines (name, category, brand, price, status, description, specs, icon, image, rating, reviews) VALUES
('PowerMax Treadmill T900', 'Cardio', 'PowerMax', 850.00, 'Available', 'Heavy-duty commercial treadmill with 20-speed settings, 15% incline, heart rate monitor, and a 3 HP motor suitable for intense daily gym use.', '{"motor":"3.0 HP","maxSpeed":"20 km/h","incline":"0-15%","weight":"98 kg","capacity":"150 kg"}', 'fa-person-running', 'images/PowerMax Treadmill T900.jpg', 4.8, 24);

INSERT INTO machines (name, category, brand, price, status, description, specs, icon, image, rating, reviews) VALUES
('IronCore Smith Machine SM-5', 'Strength', 'IronCore', 1200.00, 'Available', 'Professional-grade Smith machine with linear bearings, integrated weight rack, and safety stops for squats, bench press, and overhead press.', '{"frameWeight":"210 kg","maxLoad":"300 kg","dimensions":"200x110x220 cm","finish":"Powder Coated","warranty":"5 Years"}', 'fa-dumbbell', 'images/IronCore Smith Machine SM-5.jpg', 4.9, 18);

INSERT INTO machines (name, category, brand, price, status, description, specs, icon, image, rating, reviews) VALUES
('XFit Cable Crossover CC-200', 'Strength', 'XFit', 1450.00, 'Available', 'Dual-stack cable crossover machine with 100 kg weight stacks per side, 19 height adjustments, and multiple pulley attachment points.', '{"weightEach":"100 kg","adjustments":"19 levels","pulleys":"4 positions","frame":"Heavy Steel","warranty":"3 Years"}', 'fa-weight-hanging', 'images/XFit Cable Crossover CC-200.jpg', 4.7, 12);

INSERT INTO machines (name, category, brand, price, status, description, specs, icon, image, rating, reviews) VALUES
('AeroFit Elliptical E-Pro', 'Cardio', 'AeroFit', 680.00, 'Available', 'Low-impact elliptical trainer with 25-resistance levels, large digital display, pulse sensors, and whisper-quiet drive system.', '{"resistance":"25 levels","stride":"51 cm","display":"LCD 7 inch","capacity":"160 kg","weight":"80 kg"}', 'fa-ring', 'images/AeroFit Elliptical E-Pro.png', 4.6, 31);

INSERT INTO machines (name, category, brand, price, status, description, specs, icon, image, rating, reviews) VALUES
('StrongLife Leg Press LP-400', 'Strength', 'StrongLife', 920.00, 'Low Stock', '45-degree plate-loaded leg press with angled footplate, full safety system, and oversized carriage for comfortable heavy leg training.', '{"angle":"45 degrees","maxLoad":"500 kg","footplate":"48x48 cm","weight":"145 kg","warranty":"2 Years"}', 'fa-person', 'images/StrongLife Leg Press LP-400 machine.png', 4.5, 9);

INSERT INTO machines (name, category, brand, price, status, description, specs, icon, image, rating, reviews) VALUES
('SpinPro Bike SB-600', 'Cardio', 'SpinPro', 420.00, 'Available', 'Indoor cycling bike with magnetic resistance, adjustable handlebars and seat, built-in tablet holder, and sweat guard for intense HIIT sessions.', '{"resistance":"Magnetic 8-stage","flywheel":"20 kg","saddle":"Adjustable 4-way","display":"Digital","capacity":"130 kg"}', 'fa-person-biking', 'images/SpinPro Bike SB-600.png', 4.4, 42);

INSERT INTO machines (name, category, brand, price, status, description, specs, icon, image, rating, reviews) VALUES
('FlexLine Functional Trainer FT-300', 'Functional', 'FlexLine', 1800.00, 'Available', 'Dual adjustable pulley functional trainer with 80 kg weight stacks, 24 adjustment points, and a vast range of exercise possibilities.', '{"weightEach":"80 kg","adjustments":"24 points","frame":"Steel 4x4cm","finish":"Electrostatic","warranty":"4 Years"}', 'fa-bolt', 'images/FlexLine Functional Trainer FT-300.png', 4.9, 7);

INSERT INTO machines (name, category, brand, price, status, description, specs, icon, image, rating, reviews) VALUES
('GripMaster Dumbbell Rack DR-50', 'Free Weights', 'GripMaster', 360.00, 'Available', 'Heavy-duty 3-tier dumbbell rack with anti-roll rubber cradles, powder-coated steel, holds dumbbells from 2 kg to 50 kg per set.', '{"tiers":"3","capacity":"500 kg total","material":"Steel","finish":"Matte Black","weight":"55 kg"}', 'fa-hand-fist', 'images/GripMaster Dumbbell Rack DR-50.png', 4.3, 15);

INSERT INTO machines (name, category, brand, price, status, description, specs, icon, image, rating, reviews) VALUES
('RecoverPro Massage Chair MC-10', 'Recovery', 'RecoverPro', 2200.00, 'Out of Stock', 'Full-body commercial massage chair with 3D rollers, airbag compression, zero-gravity positioning, and 10 automatic massage programs.', '{"programs":"10 auto","rollers":"3D","airbags":"50","power":"120W","capacity":"135 kg"}', 'fa-spa', 'images/RecoverPro Massage Chair MC-10.png', 4.8, 5);

-- SERVICES --

INSERT INTO services (name, category, price, duration, description, icon) VALUES ('Equipment Installation', 'Installation', 75.00, '2-4 Hours', 'Professional setup and installation of any gym machine or equipment. Includes anchoring, safety check, and a test run with your team.', 'fa-wrench');

INSERT INTO services (name, category, price, duration, description, icon) VALUES ('Preventive Maintenance', 'Maintenance', 50.00, '1-2 Hours', 'Scheduled inspection, cleaning, lubrication, and adjustment of all moving parts to extend equipment lifespan and prevent breakdowns.', 'fa-shield');

INSERT INTO services (name, category, price, duration, description, icon) VALUES ('Machine Repair', 'Repair', 90.00, '2-6 Hours', 'Diagnosis and full repair of faulty gym equipment including motor replacement, belt alignment, electronic faults, and frame welding.', 'fa-gears');

INSERT INTO services (name, category, price, duration, description, icon) VALUES ('Equipment Upgrade', 'Upgrade', 110.00, '2-5 Hours', 'Hardware and software upgrades to existing machines including display panels, control boards, resistance systems, and cable upgrades.', 'fa-arrow-trend-up');

INSERT INTO services (name, category, price, duration, description, icon) VALUES ('Equipment Relocation', 'Installation', 60.00, '1-3 Hours', 'Safe disassembly, transport, and reassembly of gym equipment within or between facilities, with full re-alignment and safety checks.', 'fa-dolly');

INSERT INTO services (name, category, price, duration, description, icon) VALUES ('Annual Service Package', 'Maintenance', 200.00, 'Yearly', 'All-inclusive yearly maintenance package covering 4 preventive visits, priority repair response, and a 20% discount on parts and labor.', 'fa-box');

-- Verify --
SELECT 'machines' AS tbl, COUNT(*) AS rows_inserted FROM machines
UNION ALL
SELECT 'services', COUNT(*) FROM services;
