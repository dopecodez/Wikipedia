import fetch, { RequestInit } from 'node-fetch';
import { URLSearchParams } from 'url';
import { wikiError } from './errors';
 
let API_URL = 'http://en.wikipedia.org/w/api.php?',
    REST_API_URL = 'http://en.wikipedia.org/api/rest_v1/',
    // RATE_LIMIT = false,
    // RATE_LIMIT_MIN_WAIT = undefined,
    // RATE_LIMIT_LAST_CALL = undefined,
    USER_AGENT = 'wikipedia (https://github.com/dopecodez/Wikipedia/)';

async function makeRequest(params: any, redirect = true): Promise<any> {
    try {
        let search = new URLSearchParams({ ...params })
        search.set('format', 'json');
        if (redirect) {
            search.set('redirects', '');
        }
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
        throw new wikiError(error);
    }
}

export async function makeRestRequest(path: string, redirect = true): Promise<any> {
    try {
        if (!redirect) {
            path += '?redirect=false'
        }
        const options: RequestInit = {
            headers: {
                'User-Agent': USER_AGENT
            }
        }
        const response = await fetch(REST_API_URL + path, options);
        const responseBuffer = await response.buffer();
        const result = JSON.parse(responseBuffer.toString());
        return result;
    } catch (error) {
        throw new wikiError(error);
    }
}

export function setAPIUrl(prefix: string) {
    API_URL = 'http://' + prefix.toLowerCase() + '.wikipedia.org/w/api.php?';
    REST_API_URL = 'http://' + prefix.toLowerCase() + '.wikipedia.org/api/rest_v1/page/';
    return API_URL;
}

export default makeRequest;





