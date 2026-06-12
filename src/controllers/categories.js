import { getAllCategories, getCategoryDetails, getProjectsByCategoryId } from '../models/categories.js';

/**
 * Renders the main directory listing all project categories.
 */
const showCategoriesPage = async (req, res, next) => {
    try {
        const categories = await getAllCategories();
        const title = 'Service Categories';
        res.render('categories', { title, categories });
    } catch (error) {
        console.error("Error loading categories directory list:", error.message);
        next(error);
    }
};

/**
 * Renders the category details page showing its name and all associated service projects.
 */
const showCategoryDetailsPage = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const category = await getCategoryDetails(categoryId);
        
        // Return a clean 404 error template if the ID doesn't exist
        if (!category) {
            const err = new Error('Category Not Found');
            err.status = 404;
            return next(err);
        }

        const projects = await getProjectsByCategoryId(categoryId);
        const title = `${category.name} Projects`;

        res.render('category', { title, category, projects });
    } catch (error) {
        console.error("Error loading category details page:", error.message);
        next(error);
    }
};

export { showCategoriesPage, showCategoryDetailsPage };