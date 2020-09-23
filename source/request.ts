import fetch, { RequestInit } from 'node-fetch';
import { URLSearchParams } from 'url';

const API_URL = 'http://en.wikipedia.org/w/api.php?',
    // RATE_LIMIT = false,
    // RATE_LIMIT_MIN_WAIT = undefined,
    // RATE_LIMIT_LAST_CALL = undefined,
    USER_AGENT = 'wikipedia (https://github.com/dopecodez/Wikipedia/)';

async function makeRequest(params: any): Promise<any> {
    try {
        let search = new URLSearchParams({ ...params })
        search.set('format', 'json');
        if (!params.action)
            search.set('action', "query")
        const options: RequestInit = {
            headers: {
                'User-Agent': USER_AGENT
            }
        }
        const response = await fetch(API_URL + search, options);
        const responseBuffer = await response.buffer();
        const result = JSON.parse(responseBuffer.toString());
        return result;
    } catch (error) {
        throw error;
    }
}

export default makeRequest;





