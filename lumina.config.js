import mongoose from 'mongoose';

// Cache the connection promise so that serverless cold starts (Vercel, Lambda)
// reuse a single Mongoose connection instead of opening one per invocation.
let connectionPromise = null;

async function DBConnect() {
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    console.error('DATABASE_URL is not defined in .env file');
    return null;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = mongoose
    .connect(DATABASE_URL)
    .then((connection) => {
      console.log('Successfully connected to the Database!');
      return connection;
    })
    .catch((error) => {
      console.error('Failed to connect to the Database:', error);
      connectionPromise = null; // allow a retry on the next call
      return null;
    });

  return connectionPromise;
}

// lumina port
const port = process.env.PORT || 3000;

// Store valid API tokens and their permissions
// In a real application, these should be stored in a database
const API_TOKENS = new Map([
  [
    'tk_live_abc123',
    {
      name: 'Production App',
      permissions: ['read', 'write'],
      isActive: true,
      rateLimit: 1000, // requests per hour
    },
  ],
  [
    'tk_test_xyz789',
    {
      name: 'Test App',
      permissions: ['read'],
      isActive: true,
      rateLimit: 100,
    },
  ],
]);

// # Request without token
// curl http://localhost:3000/api/data

// # Request with valid token
// curl -H "X-API-Token: tk_live_abc123" http://localhost:3000/api/data

// # Request with invalid token
// curl -H "X-API-Token: invalid_token" http://localhost:3000/api/data

// # Request with token as query parameter
// curl "http://localhost:3000/api/data?api_token=tk_live_abc123"

export { port, DBConnect, API_TOKENS };
