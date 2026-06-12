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

/**
 * Retrieves the next N upcoming service projects from the database.
 * Filters out past events and sorts ascending by date.
 */
const getUpcomingProjects = async (numberOfProjects) => {
    const query = `
        SELECT 
            p.project_id,
            p.title,
            p.description,
            p.date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM public.service_project p
        INNER JOIN public.organization o 
            ON p.organization_id = o.organization_id
        WHERE p.date >= NOW()
        ORDER BY p.date ASC
        LIMIT $1;
    `;
    
    const queryParams = [numberOfProjects];
    const result = await db.query(query, queryParams);
    return result.rows;
};

/**
 * Retrieves a single service project record by its unique ID.
 */
const getProjectDetails = async (id) => {
    const query = `
        SELECT 
            p.project_id,
            p.title,
            p.description,
            p.date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM public.service_project p
        INNER JOIN public.organization o 
            ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;
    
    const queryParams = [id];
    const result = await db.query(query, queryParams);
    
    return result.rows.length > 0 ? result.rows[0] : null;
};

// Export all model functions
export { 
    getAllProjects, 
    getProjectsByOrganizationId, 
    getUpcomingProjects, 
    getProjectDetails 
};