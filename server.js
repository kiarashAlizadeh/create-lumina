import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { port, DBConnect } from './lumina.config.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

// Get the directory path of the current file
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Creating variable to configure WebService
const app = express();

// Connect to database
DBConnect();

// Enable CORS (Cross-Origin Resource Sharing) with credentials, allowing requests from frontend
app.use(
  cors({
    origin: `http://localhost:${port}`, // Frontend origin
    credentials: true,
  })
);

// Middleware to parse incoming request bodies as JSON
app.use(express.json());
// Middleware to parse cookies from incoming requests
app.use(cookieParser());

// Serve static files from the root directory (frontend part)
app.use(express.static(__dirname)); // Serve static files from the root of the project

// Dynamically load routes for API under /api/
const routePath = path.join(__dirname, 'api', 'routes');
fs.readdirSync(routePath).forEach((file) => {
  if (file.endsWith('.js')) {
    const endpoint = file.split('.')[0]; // Extract the endpoint from the file name
    import(`./api/routes/${file}`)
      .then((route) => {
        app.use(`/api/${endpoint}`, route.default); // Register the route dynamically
      })
      .catch((error) => {
        console.error(`Failed to load route: ${file}`, error);
      });
  }
});

// Fallback route for all non-API requests (serve index.html)
app.get('*', (req, res, next) => {
  // Ensure we are not matching /api routes before sending index.html
  if (!req.url.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve the frontend (index.html)
  } else {
    // If it's an API route, let the API handler handle it
    next();
  }
});

// Start WebService (both frontend and backend on the same port)
app.listen(port, () => {
  console.log(
    `Lumina is running on port ${port} | URL is: http://localhost:${port}/`
  );
});
