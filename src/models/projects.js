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

/**
 * Retrieves all upcoming service projects associated with a specific organization.
 */
const getProjectsByOrganizationId = async (organizationId) => {
    // FIXED: Changed table name from 'project' to 'public.service_project' to prevent relation errors
    const query = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            date
        FROM public.service_project
        WHERE organization_id = $1
        ORDER BY date;
    `;
      
    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

// Export the model functions cleanly
export { getAllProjects, getProjectsByOrganizationId };