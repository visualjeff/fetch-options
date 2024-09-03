import { useEffect, useState } from 'react';
import { taskGenerator, promisePool } from './taskManager';

// Example sub-functions that perform individual tasks
function task1() {
    return new Promise((resolve) => setTimeout(() => {
        resolve('Result of Task 1');
    }, 1000));
}

function task2() {
    return new Promise((resolve) => setTimeout(() => {
        resolve('Result of Task 2');
    }, 500));
}

function task3() {
    return new Promise((resolve) => setTimeout(() => {
        resolve('Result of Task 3');
    }, 1500));
}

const LongRunningTasks: React.FC = () => { // Specify the return type
    const [result, setResult] = useState<string[] | undefined>([]);
    
    useEffect(() => {
        const longChainOfTasks = async () => {
            const tasks = [ task1, task2, task3 ] // Batch up tasks
            const generator = taskGenerator(tasks); 
            const poolLimit = 2;
            const results = await promisePool(generator, poolLimit);
            setResult(results)
        }

        longChainOfTasks();
    }, []);

    return (
        <div>
          <ul>
            {result && result.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      );
};

export default LongRunningTasks;
