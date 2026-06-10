// Import any needed model functions
import { getAllProjects } from '../models/projects.js';

// Define any controller functions
const showProjectsPage = async (req, res, next) => {
    try {
        const projects = await getAllProjects();
        const title = 'Service Projects';
        res.render('projects', { title, projects });
    } catch (error) {
        console.error("Error loading projects page:", error);
        next(error);
    }
};

// Export any controller functions
export { showProjectsPage };