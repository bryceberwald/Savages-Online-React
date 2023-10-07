const http = require("http");
require('dotenv').config();
const cors = require("cors");
const express = require("express");
const socketIo = require("socket.io");
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');
const registerRoute = require('./routes/register')
const mongoose = require('./config/database');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT; // Use a default port if PORT is not specified in .env

const corsOptions = {
    origin: [
        'http://127.0.0.1:3000', 
        'http://localhost:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204, // No Content response for preflight requests
  };

app.use(cors(corsOptions));

// Configure bodyParser for JSON parsing
app.use(bodyParser.json());

// Use the userRoutes for handling user-related routes
app.use('/users', userRoute);
app.use('/api/register', registerRoute);

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});