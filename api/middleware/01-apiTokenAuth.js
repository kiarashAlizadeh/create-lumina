import { API_TOKENS } from '../../lumina.config.js';

// Token request counter for rate limiting
const tokenRequests = new Map();

// Reset counters every hour
setInterval(() => {
  tokenRequests.clear();
}, 3600000); // 1 hour

export const apiTokenAuth = () => (req, res, next) => {
  // Check if the request path starts with /api
  if (!req.path.startsWith('/api')) {
    return next(); // Skip this middleware for other paths
  }

  // Get token from header
  const apiKey = req.header('X-API-Token') || req.query.api_token;

  // Check if token exists
  if (!apiKey) {
    console.log('UnAuthorized access!');

    return res.status(401).json({
      error: 'API token is required',
      code: 'TOKEN_REQUIRED',
    });
  }

  // Get token details
  const tokenDetails = API_TOKENS.get(apiKey);

  // Check if token is valid
  if (!tokenDetails) {
    console.log('UnAuthorized access!');

    return res.status(401).json({
      error: 'Invalid API token',
      code: 'INVALID_TOKEN',
    });
  }

  // Check if token is active
  if (!tokenDetails.isActive) {
    console.log('UnAuthorized access!');

    return res.status(403).json({
      error: 'API token is inactive',
      code: 'INACTIVE_TOKEN',
    });
  }

  // Rate limiting check
  const currentRequests = tokenRequests.get(apiKey) || 0;
  if (currentRequests >= tokenDetails.rateLimit) {
    console.log('UnAuthorized access!');

    return res.status(429).json({
      error: 'Rate limit exceeded',
      code: 'RATE_LIMIT_EXCEEDED',
    });
  }

  // Increment request counter
  tokenRequests.set(apiKey, currentRequests + 1);

  // Check permission for specific endpoints (optional)
  const requestedOperation = getOperationType(req.method);
  if (!tokenDetails.permissions.includes(requestedOperation)) {
    console.log('UnAuthorized access!');

    return res.status(403).json({
      error: 'Insufficient permissions',
      code: 'INSUFFICIENT_PERMISSIONS',
    });
  }

  // Attach token info to request object
  req.apiToken = {
    ...tokenDetails,
    key: apiKey,
  };

  next();
};

// Helper function to map HTTP methods to operation types
function getOperationType(method) {
  switch (method.toUpperCase()) {
    case 'GET':
      return 'read';
    case 'POST':
    case 'PUT':
    case 'PATCH':
    case 'DELETE':
      return 'write';
    default:
      return 'read';
  }
}

// Optional: Middleware for specific permission checks
export const requireApiPermission = (permission) => (req, res, next) => {
  if (!req.apiToken) {
    console.log('UnAuthorized access!');

    return res.status(401).json({
      error: 'API token authentication required',
      code: 'TOKEN_REQUIRED',
    });
  }

  if (!req.apiToken.permissions.includes(permission)) {
    console.log('UnAuthorized access!');

    return res.status(403).json({
      error: `Permission '${permission}' required`,
      code: 'PERMISSION_REQUIRED',
    });
  }

  next();
};
