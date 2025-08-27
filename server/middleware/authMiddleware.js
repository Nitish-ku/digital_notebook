const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

// This middleware requires a signed-in user for the route to be accessible
const protect = ClerkExpressRequireAuth();

module.exports = { protect };
