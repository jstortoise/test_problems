function createJobQueue() {
    // TODO - create and return a job queue
    let queue = [];

    const addJob = job => {
        const promise = () => new Promise((resolve, reject) => {
            try {
                const match = queue.filter(obj => obj.job === job);
                if (match !== undefined) {
                    job().then(resolve).catch(reject);
                } else {
                    reject();
                }
            } catch(err) {
                reject(err);
            }
        });

        queue.push({ job, promise });
        return promise;
    };

    const cancelJob = job => {
        for (let i = 0; i < queue.length; i++) {
            if (job === queue[i].job) {
                queue.splice(i, 1);
                return;
            }
        }
    };

    const processAllJobs = () => {
        let success = 0;
        return new Promise(async (resolve, reject) => {
            for (let i = 0; i < queue.length; i++) {
                try {
                    await queue[i].promise();
                    success++;
                } catch(e) {}
            }
            resolve(success);
        });
    };

    return {
        addJob,
        cancelJob,
        processAllJobs
    };
}

module.exports = { createJobQueue };
