const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // This model is just for Mongoose to reference Clerk user IDs.
  // Actual user data is managed by Clerk.
  clerkId: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('User', userSchema);
