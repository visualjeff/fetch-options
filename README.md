# 2 ways to give the main thread a break while fetching data

## Promise pools

Via p-all or p-map we can limit the concurrency of service calls.

See src/promise-pool

## Web Workers

Use a generator function to yield a promise that resolves when the worker sends back a message.

see src/web-workers
