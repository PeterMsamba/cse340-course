import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

const app = express();

// Set up the EJS View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

/* ==========================================
   ROUTES
   ========================================== */

// Home Route
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

// Organizations Route
app.get('/organizations', (req, res) => {
    res.render('organizations', { title: 'Organizations' });
});

// Projects Route
app.get('/projects', (req, res) => {
    res.render('projects', { title: 'Projects' });
});

// NEW ROUTE: Service Project Categories Route
app.get('/categories', (req, res) => {
    res.render('categories', { title: 'Categories' });
});

/* ==========================================
   SERVER START
   ========================================== */
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});