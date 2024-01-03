// models/Chat.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  messageId: String,
  userId: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);
