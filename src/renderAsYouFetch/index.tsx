import useSWR from 'swr'
//import fetcher from '../utils/fetcher';

const delayedFetcher = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 2000));  
    return data;
};

export const RenderAsYouFetch = () => {
    const url = 'https://jsonplaceholder.typicode.com/todos/1'
    const { data } = useSWR(url, delayedFetcher, {
        suspense: true
    });

    return (
        <div>
            {data.title}
        </div>
    )
}