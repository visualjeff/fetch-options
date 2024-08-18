import React from 'react';
import { dataFetcher } from './dataProcessor'

const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
    'https://jsonplaceholder.typicode.com/todos/3',
    'https://jsonplaceholder.typicode.com/todos/4',
    'https://jsonplaceholder.typicode.com/todos/5'
]

type RecordType = {
    id: string
    title: string
}

// Note WebWorker's prevent blocking of the main thread, but they are slower 
// because of the use of events for communication between the two threads.
const WebWorker: React.FC = () => {
    const [ state, setState ] = React.useState(Array<RecordType>);

    React.useEffect(() => {
        const test = async (urls: string[]) => {
            const generator = dataFetcher(urls);
    
            const payload = []
            for (const promise of generator) {
                try {
                    const record = await promise as RecordType;
                    payload.push(record as RecordType)
                } catch (error) {
                    console.error('Error fetching data:', error);
                    throw error;  // Catch at the error boundary
                }
            }
            setState(payload)
        }

        test(urls)
    }, [])
    
    return (
        <div>
            {
                state.map((record) => {
                   return (<div key={record?.id}>{record?.title}</div>);
                })
            }
        </div>
    );
};

export default WebWorker;
