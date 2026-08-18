import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { port, DBConnect } from './lumina.config.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import { loadMiddlewares } from './api/middleware/index.js';
import dotenv from 'dotenv';

dotenv.config();

// Detect serverless platforms (Vercel), where we export the app instead of listening
const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

// Get the directory path of the current file
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Creating variable to configure WebService
const app = express();

// Connect to database
DBConnect();

// Enable CORS (Cross-Origin Resource Sharing) with credentials, allowing requests from frontend
app.use(
  cors({
    origin: isServerless ? true : `http://localhost:${port}`, // Frontend origin
    credentials: true,
  })
);

// Middleware to parse incoming request bodies as JSON
app.use(express.json());
// Middleware to parse cookies from incoming requests
app.use(cookieParser());

// Load all middlewares dynamically
await loadMiddlewares(app);

// Serve static files from the root directory (frontend part)
app.use(express.static(__dirname)); // Serve static files from the root of the project

// Dynamically load routes for API under /api/
// Awaited so the routes are registered before the first request is handled,
// which matters on serverless platforms where the module is loaded per cold start.
const routePath = path.join(__dirname, 'api', 'routes');
const routeFiles = fs.readdirSync(routePath).filter((file) => file.endsWith('.js'));

await Promise.all(
  routeFiles.map(async (file) => {
    const endpoint = file.split('.')[0]; // Extract the endpoint from the file name
    try {
      const route = await import(`./api/routes/${file}`);
      app.use(`/api/${endpoint}`, route.default); // Register the route dynamically
    } catch (error) {
      console.error(`Failed to load route: ${file}`, error);
    }
  })
);

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

// Start WebService (both frontend and backend on the same port).
// On serverless the platform invokes the exported app, so there is nothing to listen on.
if (!isServerless) {
  app.listen(port, () => {
    console.log(
      `Lumina is running on port ${port} | URL is: http://localhost:${port}/`
    );
  });
}

export default app;
