import db from './db.js';

/**
 * Retrieves all service projects from the database 
 * combined with the name of their sponsoring organization.
 */
const getAllProjects = async () => {
    const query = `
        SELECT 
            p.project_id, 
            p.title, 
            p.description, 
            p.location, 
            p.date,
            o.name AS organization_name
        FROM public.service_project p
        INNER JOIN public.organization o 
            ON p.organization_id = o.organization_id
        ORDER BY p.date ASC;
    `;

    const result = await db.query(query);
    return result.rows;
};

export { getAllProjects };