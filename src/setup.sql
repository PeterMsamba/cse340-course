-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
-- Fixed 'brightfure-logo.png' to 'brightfuture-logo.png'
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

SELECT * FROM organization;

-- ========================================
-- Service Project Table Definition
-- ========================================
CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    -- Foreign Key constraint linking to the organization table
    CONSTRAINT fk_organization 
        FOREIGN KEY (organization_id) 
        REFERENCES public.organization(organization_id)
        ON DELETE CASCADE
);

-- ========================================
-- Insert 5 Sample Projects for Each Organization
-- ========================================

-- Organization 1: BrightFuture Builders (ID: 1)
INSERT INTO service_project (organization_id, title, description, location, date) VALUES
(1, 'Community Center Painting', 'Help paint the main hall and clean classrooms at the local youth center.', 'Downtown Community Center', '2026-06-12'),
(1, 'Wheelchair Ramp Construction', 'Assist in building wooden access ramps for elderly residents homes.', 'Northside Suburban Neighborhood', '2026-06-25'),
(1, 'Playground Renewal Drive', 'Repair broken swings and apply fresh coats of protective coating to benches.', 'Hilltop Public Park', '2026-07-04'),
(1, 'Roof Repair Workshop', 'Lend a hand fixing leaks and insulating the community warehouse space.', 'Eastside Resource Depot', '2026-07-19'),
(1, 'Sidewalk Leveling Project', 'Mix and pour small concrete slabs to fix damaged walking paths.', 'Greenwood Walking Trails', '2026-08-01');

-- Organization 2: GreenHarvest Growers (ID: 2)
INSERT INTO service_project (organization_id, title, description, location, date) VALUES
(2, 'Spring Seed Planting Initiative', 'Help plant seasonal vegetable crops and label nursery beds.', 'Community Greenhouse Compound', '2026-06-05'),
(2, 'Urban Orchard Pruning', 'Prune fruit trees and remove weeds from surrounding soil basins.', 'West End Public Orchard', '2026-06-18'),
(2, 'Compost Bin Assembly', 'Build new wooden aeration boxes for organic waste composting arrays.', 'Central Soil Station', '2026-07-11'),
(2, 'Rainwater System Setup', 'Install collection barrels and pvc pipeline routes to catch rain runoff.', 'Southside Garden Allotment', '2026-07-28'),
(2, 'Harvest and Pack Day', 'Gather ripe vegetables and sort them into fresh produce boxes.', 'GreenHarvest Distribution Shed', '2026-08-15');

-- Organization 3: UnityServe Volunteers (ID: 3)
INSERT INTO service_project (organization_id, title, description, location, date) VALUES
(3, 'Local Park Garbage Cleanup', 'Clear plastic containers and debris from recreational pathways.', 'Riverside Conservation Reserve', '2026-06-15'),
(3, 'Community Kitchen Food Prep', 'Help chop fresh ingredients and package hot meals for distribution.', 'Unity Soup Kitchen HQ', '2026-06-30'),
(3, 'After-School Math Tutoring', 'Provide clear educational guidance to primary school students.', 'City Public Library Hall B', '2026-07-08'),
(3, 'Senior Center Companion Walk', 'Accompany senior residents on walks and assist with reading tasks.', 'Silver Lining Care Home', '2026-07-22'),
(3, 'Book Donation Sorting Drive', 'Categorize and stamp incoming literary collections into inventory bins.', 'UnityServe Regional Warehouse', '2026-08-09');

SELECT * FROM service_project;

-- ========================================
-- 1. Category Table
-- ========================================
CREATE TABLE public.category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================================
-- 2. Project-Category Junction Table (Many-to-Many)
-- ========================================
CREATE TABLE public.project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    -- If a project is deleted, clean up its links
    CONSTRAINT fk_project 
        FOREIGN KEY (project_id) 
        REFERENCES public.service_project(project_id) 
        ON DELETE CASCADE,
    -- If a category is deleted, clean up its links
    CONSTRAINT fk_category 
        FOREIGN KEY (category_id) 
        REFERENCES public.category(category_id) 
        ON DELETE CASCADE
);

-- ========================================
-- 3. Insert At Least 3 Sample Categories
-- ========================================
INSERT INTO public.category (name) VALUES
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');

-- ========================================
-- 4. Associate Each Project with At Least One Category
-- ========================================
-- Assuming project_ids are 1 through 15 from your previous seed script:

-- Mapping BrightFuture Builders (Projects 1-5) primarily to Community Service & Environmental
INSERT INTO public.project_category (project_id, category_id) VALUES
(1, 3), -- Project 1 (Painting) -> Community Service
(2, 3), -- Project 2 (Wheelchair Ramps) -> Community Service
(3, 1), -- Project 3 (Playground Renewal) -> Environmental
(3, 3), -- Project 3 also maps to Community Service (Many-to-Many demonstration)
(4, 3), -- Project 4 (Roof Repair) -> Community Service
(5, 3); -- Project 5 (Sidewalk Leveling) -> Community Service

-- Mapping GreenHarvest Growers (Projects 6-10) primarily to Environmental & Health/Wellness
INSERT INTO public.project_category (project_id, category_id) VALUES
(6, 1),  -- Project 6 (Seed Planting) -> Environmental
(7, 1),  -- Project 7 (Orchard Pruning) -> Environmental
(8, 3),  -- Project 8 (Compost Bins) -> Community Service
(9, 1),  -- Project 9 (Rainwater Setup) -> Environmental
(10, 4); -- Project 10 (Harvest and Pack) -> Health and Wellness

-- Mapping UnityServe Volunteers (Projects 11-15) to various categories
INSERT INTO public.project_category (project_id, category_id) VALUES
(11, 1), -- Project 11 (Park Cleanup) -> Environmental
(12, 4), -- Project 12 (Kitchen Food Prep) -> Health and Wellness
(13, 2), -- Project 13 (Math Tutoring) -> Educational
(14, 3), -- Project 14 (Senior Companion Walk) -> Community Service
(14, 4), -- Project 14 also maps to Health and Wellness
(15, 2); -- Project 15 (Book Donation Drive) -> Educational