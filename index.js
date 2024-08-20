/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */
require('dotenv').config();
const express = require('express');
const { Queue } = require('bullmq');

const promptQueue = new Queue('prompt-queue');

const app = express();

app.use(express.json());

let requestCounter = 0;
app.post('/', async function (req, res) {
    //insert to queue call producer
    console.log('req.body',req.body)
    const { parts } = req.body;
    const response = await promptQueue.add('prompt-queue', {
        parts,
    });
    console.log('job added', response.id, parts);
    res.send({
        message: `job added ${response.id}`,
    });
});

app.listen(3000, function () {
    console.log('Server is running on http://localhost:3000');
});


// generateResponse(parts, counter % models.length)
// .then((response) => {
//     requestCounter++;
//     console.log( response,`success request count ${requestCounter}`);
//     res.json(response);
// })
// .catch((error) => {
//     console.error(error);
//     res.status(500).send(
//         'An error occurred while generating the response'
//     );
// });