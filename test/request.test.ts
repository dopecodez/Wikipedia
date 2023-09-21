import axios, {AxiosHeaders} from 'axios';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import request, {makeRestRequest, setAPIUrl, returnRestUrl, setUserAgent} from '../source/request';
import { wikiError } from '../source';
const fetchMock = jest.spyOn(axios, "get");

const options: AxiosRequestConfig = {
	headers: {
		'Api-User-Agent': 'wikipedia (https://github.com/dopecodez/Wikipedia/)'
	}
}
const baseConfig : AxiosResponse['config'] = { headers: new AxiosHeaders()};
const baseResponse : Omit<AxiosResponse, 'data'> = { status: 200, statusText: 'Ok', request: {}, headers: {}, config: baseConfig};
const response1 : AxiosResponse = {...baseResponse, data:{"test1": "test1"}};
const response2 : AxiosResponse = {...baseResponse, data:{"test2": "test2"}};
const response3 : AxiosResponse = {...baseResponse, data:{"test3": "test3"}};
//const response4 : AxiosResponse = {...baseResponse, data:{"test4": "test4"}};
const apiUrl = "https://en.wikipedia.org/w/api.php?";
const restApiUrl = 'https://en.wikipedia.org/api/rest_v1/';

afterAll(() => {
    fetchMock.mockRestore();
})

test('makeRequest method calls and returns with expected params', async () => {
    fetchMock.mockImplementation(async () => { return response1 } );
    await request({}, true);
    expect(fetchMock).toHaveBeenCalledWith(
        apiUrl + 'format=json&redirects=&action=query&origin=*&',
        options
    );
});

test('makeRequest method calls and returns with expected params when no value passed for redirect', async () => {
    fetchMock.mockImplementation(async () => { return response3 } );
    await request({});
    expect(fetchMock).toHaveBeenCalledWith(
        apiUrl + 'format=json&redirects=&action=query&origin=*&',
        options
    );
});

test('makeRequest throws wiki error if error is raised', async () => {
    fetchMock.mockImplementation(async () => { throw new Error("Error") });
    const t = async () => {
        await request({}, true)
    };
    expect(t).rejects.toThrowError(wikiError);
});

test('makeRestRequest method calls and returns with expected params', async () => {
    fetchMock.mockImplementation(async () => { return response2 } );
    await makeRestRequest("path", false);
    expect(fetchMock).toHaveBeenCalledWith(
        restApiUrl + 'path?redirect=false',
        options
    );
});

test('makeRestRequest throws wiki error if error is raised', async () => {
    fetchMock.mockImplementation(async () => { throw new Error("Error") });
    const t = async () => {
        await makeRestRequest("")
    };
    expect(t).rejects.toThrowError(wikiError);
});

// test('makeRestRequest method calls and returns with expected params when no value for redirect', async () => {
//     fetchMock.mockImplementation(async () => { return response4 } );
//     await makeRestRequest("path");
//     expect(fetchMock).toHaveBeenCalledWith(
//         restApiUrl + 'path?redirect=true',
//         options
//     );
// });

test('Return rest url', () => {
    const result = returnRestUrl("path/pdf");
    expect(result).toStrictEqual("https://en.wikipedia.org/api/rest_v1/path/pdf");
});

test('Set language returns api url with language set', () => {
    const result = setAPIUrl("mal");
    expect(result).toStrictEqual("https://mal.wikipedia.org/w/api.php?");
});

test('Set user agent and use it to call the api', async () => {
    setUserAgent("testUser");
    fetchMock.mockImplementation(async () => { return response1 } );
    await request({}, true);
    const modifiedOptions : AxiosRequestConfig = {
        headers: {
            'Api-User-Agent': 'testUser'
        }
    }
    expect(fetchMock).toHaveBeenCalledWith(
        expect.anything(),
        modifiedOptions
    );
});