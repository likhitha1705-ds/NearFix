-- ========================================================
-- NearFix – Local Service Finder for Mumbai
-- Database Seed Data for MySQL / MySQL Workbench
-- ========================================================

USE nearfix;

-- Clear previous data
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE service_requests;
TRUNCATE TABLE providers;
TRUNCATE TABLE categories;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Insert Initial Users
-- Password for Admin is 'Admin@123'
-- Password for Providers is 'Provider@123'
-- Password for Customer is 'Customer@123'
INSERT INTO users (id, full_name, email, password_hash, phone, role, locality) VALUES
(1, 'System Administrator', 'admin@nearfix.in', '$2a$10$UTzSNxFHPbObPEhGQ9abY.FnwhoXzUIophGKTr3BtDva9KPXRXbom', '+91 98200 00001', 'admin', 'Mumbai, Maharashtra'),
(2, 'Rahul Sharma', 'rahul.sharma@demo.nearfix.in', '$2a$10$GekRa8RC4Q.t/fl15obNvOVXoPEr65xmlWbW5IonuMF8RAd1lEVQO', '+91 98200 11001', 'provider', 'Andheri West, Mumbai'),
(3, 'Amit Patil', 'amit.patil@demo.nearfix.in', '$2a$10$GekRa8RC4Q.t/fl15obNvOVXoPEr65xmlWbW5IonuMF8RAd1lEVQO', '+91 98200 22002', 'provider', 'Dadar, Mumbai'),
(4, 'Neha Deshmukh', 'neha.deshmukh@demo.nearfix.in', '$2a$10$GekRa8RC4Q.t/fl15obNvOVXoPEr65xmlWbW5IonuMF8RAd1lEVQO', '+91 98200 33003', 'provider', 'Bandra West, Mumbai'),
(5, 'Pooja Kulkarni', 'customer@demo.in', '$2a$10$KCoqU1ma2oKkSDd.P0HAXugHSfkOvw4zho2aiWYqEAet6eKY7pTf6', '+91 98200 44004', 'customer', 'Andheri West, Mumbai');

-- 2. Insert Exactly Three Service Categories
INSERT INTO categories (id, name, slug, description, icon) VALUES
(1, 'Electrician', 'electrician', 'Electrical installation and repair.', '⚡'),
(2, 'Plumber', 'plumber', 'Water leaks, taps, and pipe repairs.', '🔧'),
(3, 'AC Repair', 'ac-repair', 'Air-conditioner servicing and repair.', '❄️');

-- 3. Insert Exactly Three Fictional Demo Provider Profiles
INSERT INTO providers (id, user_id, category_id, name, service_category, locality, city, experience_years, description, availability_status, is_active, demo_phone, demo_email) VALUES
(1, 2, 1, 'Rahul Sharma', 'Electrician', 'Andheri West, Mumbai', 'Mumbai, Maharashtra', 3, 'Electrical installation, wiring checks, and minor electrical repairs.', 'Available', TRUE, '+91 98200 11001', 'rahul.sharma@nearfix.in'),
(2, 3, 2, 'Amit Patil', 'Plumber', 'Dadar, Mumbai', 'Mumbai, Maharashtra', 4, 'Tap repairs, water leakage, and basic pipe maintenance.', 'Available', TRUE, '+91 98200 22002', 'amit.patil@nearfix.in'),
(3, 4, 3, 'Neha Deshmukh', 'AC Repair', 'Bandra West, Mumbai', 'Mumbai, Maharashtra', 3, 'AC cleaning, routine servicing, and basic cooling issue checks.', 'Available', TRUE, '+91 98200 33003', 'neha.deshmukh@nearfix.in');

-- 4. Insert Initial Sample Service Request (For customer activity)
INSERT INTO service_requests (id, customer_id, provider_id, service_category, preferred_date, locality, description, status) VALUES
(1, 5, 1, 'Electrician', '2026-10-18', 'Andheri West, Mumbai', 'MCB tripping issue and inspection of living room switchboard.', 'Pending');
