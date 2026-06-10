import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

/**
 * Renders the partner organizations directory list page.
 */
const showOrganizationsPage = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();
        const title = 'Our Partner Organizations';
        res.render('organizations', { title, organizations });
    } catch (error) {
        console.error("Error loading organizations list:", error.message);
        next(error); // Passes execution safely down to the global error middleware block
    }
};

/**
 * Renders a granular view detailing a singular organization alongside related projects.
 */
const showOrganizationDetailsPage = async (req, res, next) => {
    try {
        const organizationId = req.params.id;
        const organizationDetails = await getOrganizationDetails(organizationId);
        
        // If query parameters locate no matching entity record, pass a 404 block handler
        if (!organizationDetails) {
            const err = new Error('Organization Not Found');
            err.status = 404;
            return next(err);
        }

        const projects = await getProjectsByOrganizationId(organizationId);
        const title = 'Organization Details';

        res.render('organization', { title, organizationDetails, projects });
    } catch (error) {
        console.error("Error handling organization details resolution:", error.message);
        next(error);
    }
};

export { showOrganizationsPage, showOrganizationDetailsPage };