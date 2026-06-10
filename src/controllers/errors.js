// Define any controller functions for intentional error testing
const testErrorPage = (req, res, next) => {
    const err = new Error('This is a test error');
    err.status = 500;
    next(err);
};

// Export any controller functions
export { testErrorPage };