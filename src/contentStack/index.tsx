import React from 'react';

// Note WebWorker's prevent blocking of the main thread, but they are slower 
// because of the use of events for communication between the two threads.

const worker = new Worker(new URL('./worker.ts', import.meta.url), {
    type: 'module'
});


const MyComponent = () => {
    const [ state, setState ] = React.useState<any | undefined>();

    React.useEffect(() => {
        const test = async () => {
            worker.onmessage = (event) => {
                setState(event.data.result);
            };
            worker.postMessage('test');
            }
        test()
    }, [])
    
    return (
        <div>
            {state && state?.description}
        </div>
    );
};

export default MyComponent;