const http = require("http");
require('dotenv').config();
const cors = require("cors");
const express = require("express");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT;

const corsOptions = {
    origin: `http://127.0.0.1:${PORT}` || `http://localhost:${PORT}`,
};

app.use(cors(corsOptions));

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});