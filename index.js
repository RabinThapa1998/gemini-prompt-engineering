/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */
require('dotenv').config();
var cors = require('cors')
const express = require('express');
const { Server } = require('socket.io');

const { Queue } = require('bullmq');
const app = express();

app.use(cors({
     origin: '*',
}))
const promptQueue = new Queue('prompt-queue');


const server = require('http').createServer(app);
const io = new Server(server,{
    cors: {
        origin: '*',  // Allow all origins for WebSocket connections
        methods: ['GET', 'POST'],  // Allow GET and POST methods
    }
});

app.use(express.json());

let requestCounter = 0;
app.post('/', async function (req, res) {
    const { parts } = req.body;
    const response = await promptQueue.add('prompt-queue', {
        parts,
    });
    console.log('job added', response.id, parts);
    res.send({
        message: `job added ${response.id}`,
    });
});

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

server.listen(3000, function () {
    console.log('Server is running on http://localhost:3000');
});
