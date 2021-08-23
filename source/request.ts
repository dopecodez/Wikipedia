import fetch, { RequestInit } from 'node-fetch';
import { wikiError } from './errors';
 
let API_URL = 'https://en.wikipedia.org/w/api.php?',
    REST_API_URL = 'https://en.wikipedia.org/api/rest_v1/';
    // RATE_LIMIT = false,
    // RATE_LIMIT_MIN_WAIT = undefined,
    // RATE_LIMIT_LAST_CALL = undefined,
const USER_AGENT = 'wikipedia (https://github.com/dopecodez/Wikipedia/)';

// Makes a request to legacy php endpoint
async function makeRequest(params: any, redirect = true): Promise<any> {
    try {
        const search = { ...params }
        search['format'] = 'json';
        if (redirect) {
            search['redirects'] = '';
        }
        if (!params.action)
            search['action'] = "query";
        search['origin'] = '*';
        const options: RequestInit = {
            headers: {
                'User-Agent': USER_AGENT,
            }
        }
        let searchParam = '';
        Object.keys(search).forEach(key => {
            searchParam += `${key}=${search[key]}&`
        });
        const response = await fetch(encodeURI(API_URL + searchParam), options);
        const result = await response.json();
        return result;
    } catch (error) {
        throw new wikiError(error);
    }
}

// Makes a request to rest api endpoint
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
        console.log(encodeURI(REST_API_URL + path));
        const response = await fetch(encodeURI(REST_API_URL + path), options);

        let result = await response.text();
        try {
            result = JSON.parse(result);
        }
        finally {
            return result;
        }
    } catch (error) {
        throw new wikiError(error);
    }
}

//return rest uri
export function returnRestUrl(path: string): string {
    const url = encodeURI(REST_API_URL + path);
    return url;
}

//change language of both urls
export function setAPIUrl(prefix: string) : string {
    API_URL = 'https://' + prefix.toLowerCase() + '.wikipedia.org/w/api.php?';
    REST_API_URL = 'https://' + prefix.toLowerCase() + '.wikipedia.org/api/rest_v1/';
    return API_URL;
}

export default makeRequest;




