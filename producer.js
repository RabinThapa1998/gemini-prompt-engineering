const { Queue } = require('bullmq');

const promptQueue = new Queue('prompt-queue');

async function init() {
    const res = await promptQueue.add('prompt-queue', {
        parts: 'hello',
    });
    console.log('job added', res.id);
}

init();
