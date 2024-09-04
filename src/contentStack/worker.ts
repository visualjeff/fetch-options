// Can import other dependencies into a web worker with the module flag.
import Contentstack, { Config } from 'contentstack';

const stackConfig = {
    api_key: '',
    branch: 'main',
    delivery_token: '',
    environment: 'development',
    fetchOptions: {
        retryLimit: 0
    },
    region: 'azure-na'
} as Config

self.onmessage = async () => {
    const stack = Contentstack.Stack(stackConfig);

    try {
        const result = await stack
            .ContentType('Configuration_Setting')
            .Entry('bltcc6ce2b58606e620')
            .language('adt')
            .toJSON()
            .fetch();

        console.log(JSON.stringify(result))

        self.postMessage({ result });
    } catch (error: any ) {
        self.postMessage({ error: error.message });
    }
};