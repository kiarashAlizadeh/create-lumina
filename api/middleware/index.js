// middleware/index.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Function to load all middlewares dynamically
export const loadMiddlewares = async (app) => {
  try {
    // Get all files in the middleware directory
    const files = await fs.readdir(__dirname);

    // Sort files to ensure consistent loading order
    const middlewareFiles = files
      .filter((file) => file !== 'index.js' && file.endsWith('.js'))
      .sort();

    // Load each middleware file
    for (const file of middlewareFiles) {
      const middlewareModule = await import(`./${file}`);
      const middlewareName = path.basename(file, '.js');

      // If middleware exports multiple functions
      if (typeof middlewareModule === 'object') {
        Object.entries(middlewareModule).forEach(([key, middleware]) => {
          if (typeof middleware === 'function') {
            // Check if it's a middleware that needs configuration
            if (middleware.length === 0) {
              app.use(middleware());
            } else {
              // Store middleware in app.locals for later use
              if (!app.locals.middlewares) {
                app.locals.middlewares = {};
              }
              app.locals.middlewares[key] = middleware;
            }
          }
        });
      }
      // If middleware exports a single function
      else if (typeof middlewareModule.default === 'function') {
        const middleware = middlewareModule.default;
        if (middleware.length === 0) {
          app.use(middleware());
        } else {
          if (!app.locals.middlewares) {
            app.locals.middlewares = {};
          }
          app.locals.middlewares[middlewareName] = middleware;
        }
      }
    }

    console.log('Middlewares loaded successfully');
  } catch (error) {
    console.error('Error loading middlewares:', error);
    throw error;
  }
};
