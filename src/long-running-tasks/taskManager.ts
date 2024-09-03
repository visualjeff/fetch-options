// Define the Task type as a function that returns a Promise
type Task = () => Promise<any>;

// Generator function to yield tasks
function* taskGenerator(tasks: Task[]): Generator<Task, void, unknown> {
    for (const task of tasks) {
        yield task;
    }
}

async function promisePool(generator: Generator<Task, void, unknown>, poolLimit: number): Promise<any[]> {
    const pool: Promise<void>[] = [];
    const results: any[] = [];  // Array to store the results of each task
    let index = 0; // Track the current index

    for (const task of generator) {
        // Capture the index for the current task
        const currentIndex = index++;

        const promise = task().then(result => {
            results[currentIndex] = result;  // Store the result at the correct index
        });

        const taskWrapper = promise.finally(() => {
            // Remove the completed promise from the pool
            pool.splice(pool.indexOf(taskWrapper), 1);
        });

        pool.push(taskWrapper);

        if (pool.length >= poolLimit) {
            // Wait for one of the tasks in the pool to finish
            await Promise.race(pool);
        }
    }

    // Wait for all remaining tasks to complete
    await Promise.all(pool);

    return results;  // Return the collected results
}

export { promisePool, taskGenerator };
