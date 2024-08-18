import React from 'react'
import pMap from 'p-map';
import fetcher from '../utils/fetcher';

const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
    'https://jsonplaceholder.typicode.com/todos/3',
    'https://jsonplaceholder.typicode.com/todos/4',
    'https://jsonplaceholder.typicode.com/todos/5'
]
    
const mapper = async (url: string) => {
    return await fetcher(url, {});
};

type RecordType = {
    id: string
    title: string
}

// Promise-pools can limit the amount of resources being used by a collection of asynchronous activities.
export const PMap: React.FC = () => {
    const [ state, setState ] = React.useState([] as RecordType[]);

    React.useEffect(() => {
        const test = async () => {
            const testPMap = await pMap(urls, mapper, {concurrency: 3});
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
