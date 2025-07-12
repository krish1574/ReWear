const mongoose = require('mongoose');

const swapSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  offeredItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  swapType: { type: String, enum: ['points', 'direct'], required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'completed'], default: 'pending' },
  requestedAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

module.exports = mongoose.model('Swap', swapSchema);