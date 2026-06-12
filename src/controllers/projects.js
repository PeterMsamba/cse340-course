import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js'; // New Model Import

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res, next) => {
    try {
        const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
        const title = 'Upcoming Service Projects';
        res.render('projects', { title, projects });
    } catch (error) {
        console.error("Error loading upcoming projects view:", error.message);
        next(error);
    }
};

const showProjectDetailsPage = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const project = await getProjectDetails(projectId);
        
        if (!project) {
            const err = new Error('Service Project Not Found');
            err.status = 404;
            return next(err);
        }

        // NEW: Fetch all category tags assigned to this specific project
        const categories = await getCategoriesByProjectId(projectId);
        const title = project.title;
        
        // Pass the categories array directly to the view template
        res.render('project', { title, project, categories });
    } catch (error) {
        console.error("Error loading service project detail view profile:", error.message);
        next(error);
    }
};

export { showProjectsPage, showProjectDetailsPage };