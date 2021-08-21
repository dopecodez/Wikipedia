import request, {makeRestRequest, setAPIUrl, returnRestUrl} from '../source/request';
import * as fetch from 'node-fetch';
import { Response } from 'node-fetch';
import { wikiError } from '../source/errors';
const fetchMock = jest.spyOn(fetch, "default");

const response1 : Response = new Response('{"test1": "test1"}');
const response2 : Response = new Response('{"test2": "test2"}');
const response3 : Response = new Response('{"test3": "test3"}');
const response4 : Response = new Response('{"test4": "test4"}');
const apiUrl = "http://en.wikipedia.org/w/api.php?";
const restApiUrl = 'http://en.wikipedia.org/api/rest_v1/';
const options: RequestInit = {
    headers: {
        'User-Agent': 'wikipedia (https://github.com/dopecodez/Wikipedia/)'
    }
}

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
    expect(result).toStrictEqual("http://en.wikipedia.org/api/rest_v1/path/pdf");
});

test('Set language returns api url with language set', () => {
    const result = setAPIUrl("mal");
    expect(result).toStrictEqual("http://mal.wikipedia.org/w/api.php?");
});