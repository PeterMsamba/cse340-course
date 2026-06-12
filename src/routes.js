import express from 'express';
import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, showOrganizationDetailsPage } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js'; // Updated Imports
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

// Base & Organization Routes
router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

// Service Projects Routes
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

// Category Routes
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage); // NEW: Dynamic category route

// Global Error Testing Route
router.get('/test-error', testErrorPage);

export default router;