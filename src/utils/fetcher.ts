export class HTTPError extends Error {
    readonly response: unknown;
    readonly status: number;
    readonly statusText: string;

    constructor(status: number, statusText: string, response: unknown) {
        super(statusText);
        this.status = status;
        this.statusText = statusText;
        this.response = response;
    }
}

const fetcher = async (url: RequestInfo | URL, init: RequestInit) =>
    fetch(url, init)
        .then(response => {
            if (!response.ok) {
                throw new HTTPError(
                    response.status,
                    response.statusText,
                    response
                );
            }
            return response.json();
        }).catch((err: unknown) => {
          if ((err as Error)?.name === 'AbortError') {
            // Ignored.  Fetch was cancelled by the AbortController.  Do NOT log an error.
          } else {
            throw err; // Catch at an error boundary
          }
        });
       
export default fetcher;