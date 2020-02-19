const events = require('events');
const eventEmitter = new events.EventEmitter();


function createJobQueue() {
    let queue = [];
    const addJob = job => {
        let jobObj = {
            id: queue.length,
            job: job,
            canceled: false
        }

        queue.push(jobObj);

        const promise = new Promise((resolve, reject) => {
            eventEmitter.on('job_' + jobObj.id, () => {
                if (jobObj.canceled) {
                    return reject();
                }
                job().then(resolve).catch(reject);
            });
        });

        jobObj.promise = promise;
        return promise;
    }


    const cancelJob = job => {
        for (let jobObj of queue) {
            if (jobObj.job == job) {
                console.log('canceled');
                jobObj.canceled = true;
                eventEmitter.emit('job_' + jobObj.id);
            }
        }
    }

    const processAllJobs = async() => {
        let jobsDone = 0;
        for (let jobObj of queue) {
            eventEmitter.emit('job_' + jobObj.id);
            try {
                await jobObj.promise
                jobsDone++;
            } catch(e) {

            }
        }
        return jobsDone;
    }

    return {
        addJob,
        cancelJob,
        processAllJobs
    }


}

module.exports = { createJobQueue };