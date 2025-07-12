const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  points: { type: Number, default: 0 },
  registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
