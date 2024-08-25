// Generator function yields results when you ask for them

export function* dataFetcher(urls: string[]) {
    for (const url of urls) {
        // Create a web worker for each url
        const worker = new Worker(new URL('./dataWorker.ts', import.meta.url), {
            type: 'module'
        });

        // Yield a promise that resolves when the worker sends back a message
        yield new Promise((resolve, reject) => {
            worker.onmessage = (event) => {
                if (event.data.error) {
                    reject(event.data.error);
                } else {
                    resolve(event.data.data);
                }
            };
            worker.onerror = (error) => {
                reject(error.message);
            };
            worker.postMessage({ url });
        });
    }
}
