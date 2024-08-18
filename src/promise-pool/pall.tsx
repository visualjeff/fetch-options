import React from 'react'
import pAll from 'p-all';
import fetcher from '../utils/fetcher';

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

// Convert array of urls to array of functions that fetch
const mapper = (url: string) => () => fetcher(url, {});

// Promise-pools can limit the amount of resources being used by a collection of asynchronous activities.
export const PAll: React.FC = () => {
    const [ state, setState ] = React.useState([] as RecordType[]);

    React.useEffect(() => {
        const test = async () => {
            const testPMap = await pAll(urls.map(mapper), {concurrency: 3})
            setState(testPMap)
        }
        test()
    }, [])
    
    return (
        <div>
            {
                state.map((record) => {
                   return (<div key={record?.id}>{record?.title}</div>);
                })
            }
        </div>
    )
}
