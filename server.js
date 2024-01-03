// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { textToSpeech } = require('./openai.js'); 
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const cors = require('cors');

app.use(cors());
mongoose.connect('mongodb://localhost/chatAppDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


const chatSchema = new mongoose.Schema({
  messageId: String,
  userId: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const Chat = mongoose.model('Chat', chatSchema);


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', async (data) => {
    const { userId, message } = data;

    
    const audioStream = await textToSpeech(message);

    
    io.to(userId).emit('text-to-speech', { audioStream });
  });

 
  
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); 
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
