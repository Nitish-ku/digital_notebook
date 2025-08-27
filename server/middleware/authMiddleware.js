require('dotenv').config();
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

const protect = ClerkExpressRequireAuth();

module.exports = { protect };