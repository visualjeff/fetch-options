// Can't import other dependencies into a web worker, so I wasn't able to use the existing fetcher utility.

self.onmessage = async (event) => {
    const { url } = event.data;

    try {
        const response = await fetch(url, {});
        const data = await response.json();
        self.postMessage({ data });
    } catch (error: any ) {
        self.postMessage({ error: error.message });
    }
};