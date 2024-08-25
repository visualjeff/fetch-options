// Can import other dependencies into a web worker with the module flag.
import dataFetcher from "../utils/fetcher"; 

self.onmessage = async (event) => {
    const { url } = event.data;

    try {
        const data = await dataFetcher(url, {});
        self.postMessage({ data });
    } catch (error: any ) {
        self.postMessage({ error: error.message });
    }
};