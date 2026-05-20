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

export { getAllCategories };