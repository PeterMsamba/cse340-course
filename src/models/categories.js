import db from './db.js';

/**
 * Retrieves all project categories from the database sorted alphabetically.
 */
const getAllCategories = async () => {
    const query = `
        SELECT category_id, name 
        FROM public.category
        ORDER BY name ASC;
    `;

    const result = await db.query(query);
    return result.rows;
};

/**
 * Retrieves a single category record by its unique ID.
 */
const getCategoryDetails = async (categoryId) => {
    const query = `
        SELECT category_id, name
        FROM public.category
        WHERE category_id = $1;
    `;
    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);
    return result.rows.length > 0 ? result.rows[0] : null;
};

/**
 * Retrieves all categories linked to a specific service project.
 * Uses the project_category junction table.
 */
const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT c.category_id, c.name
        FROM public.category c
        INNER JOIN public.project_category pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name ASC;
    `;
    const queryParams = [projectId];
    const result = await db.query(query, queryParams);
    return result.rows;
};

/**
 * Retrieves all service projects tagged under a specific category.
 * Uses the project_category junction table.
 */
const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT p.project_id, p.title, p.description, p.location, p.date
        FROM public.service_project p
        INNER JOIN public.project_category pc ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.date ASC;
    `;
    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);
    return result.rows;
};

// Export all model functions
export { 
    getAllCategories, 
    getCategoryDetails, 
    getCategoriesByProjectId, 
    getProjectsByCategoryId 
};