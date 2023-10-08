const http = require("http");
require('dotenv').config();
const cors = require("cors");
const express = require("express");
const bodyParser = require('body-parser');

const initializeSocket = require("./socket"); 
const userRoutes = require('./routes/user');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const mongoose = require('./config/database');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT;

const corsOptions = {
    origin: [
        'http://127.0.0.1:3000', 
        'http://localhost:3000',
        'http://127.0.0.1:3001', 
        'http://localhost:3001',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);

// Initialize Socket.io with CORS configuration
initializeSocket(server, corsOptions);

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});