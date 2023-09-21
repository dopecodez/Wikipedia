import axios, { AxiosRequestConfig } from 'axios';
import { wikiError } from './errors';

let API_URL = 'https://en.wikipedia.org/w/api.php?',
    REST_API_URL = 'https://en.wikipedia.org/api/rest_v1/',
    // RATE_LIMIT = false,
    // RATE_LIMIT_MIN_WAIT = undefined,
    // RATE_LIMIT_LAST_CALL = undefined,
    USER_AGENT = 'wikipedia (https://github.com/dopecodez/Wikipedia/)';

async function callAPI(url: string) {
  const options: AxiosRequestConfig = {
    headers: {
      "Api-User-Agent": USER_AGENT,
    },
  };
  try {
    const { data } = await axios.get(url, options);
    return data;
  } catch (error) {
    throw new wikiError(error);
  }
}

// Makes a request to legacy php endpoint
async function makeRequest(params: any, redirect = true): Promise<any> {
    const search = { ...params };
    search['format'] = 'json';
    if (redirect) {
        search['redirects'] = '';
    }
    if (!params.action) {
        search['action'] = "query";
    }
    search['origin'] = '*';
    let searchParam = '';
    Object.keys(search).forEach(key => {
        searchParam += `${key}=${search[key]}&`;
    });
    
    return await callAPI(encodeURI(API_URL + searchParam));
}

// Makes a request to rest api endpoint
export async function makeRestRequest(path: string, redirect = true): Promise<any> {
    if (!redirect) {
        path += '?redirect=false';
    }
    
    return await callAPI(encodeURI(REST_API_URL + path));
}

//return rest uri
export function returnRestUrl(path: string): string {
    return encodeURI(REST_API_URL + path);
}

//change language of both urls
export function setAPIUrl(prefix: string) : string {
    API_URL = 'https://' + prefix.toLowerCase() + '.wikipedia.org/w/api.php?';
    REST_API_URL = 'https://' + prefix.toLowerCase() + '.wikipedia.org/api/rest_v1/';
    return API_URL;
}

//change user agent
export function setUserAgent(userAgent: string) {
  USER_AGENT = userAgent;
}

export default makeRequest;




