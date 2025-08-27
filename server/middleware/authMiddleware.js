require('dotenv').config();
const { Clerk } = require('@clerk/clerk-sdk-node');

const clerk = Clerk({
  secretKey: process.env.CLERK_SECRET_KEY,
});

const protect = async (req, res, next) => {
  try {
    await clerk.authenticateRequest(req);
    if (req.auth.userId) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = { protect };