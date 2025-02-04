import mongoose from 'mongoose';

async function DBConnect() {
  try {
    const DATABASE_URL = process.env.DATABASE_URL;
    if (!DATABASE_URL) {
      console.error('DATABASE_URL is not defined in .env file');
      return;
    }

    // Connecting to the database
    await mongoose.connect(DATABASE_URL);

    console.log('Successfully connected to the Database!');
  } catch (error) {
    console.error('Failed to connect to the Database:', error);
  }
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
