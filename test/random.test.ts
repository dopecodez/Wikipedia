import * as request from '../source/request';
import wiki from "../source/index";
import { mobileSections, summaryJson, title } from './samples';
const requestMock = jest.spyOn(request, "makeRestRequest");

afterAll(() => {
    requestMock.mockRestore();
})

test('Throws error if response is error', async () => {
    requestMock.mockImplementation(async () => { throw new Error("This is an error") });
    const err = async () => { await wiki.random("some_arg") };
    expect(err).rejects.toThrowError(Error);
});

test('Returns summary of random article summary', async () => {
    requestMock.mockImplementation(async () => { return summaryJson });
    const result = await wiki.random("summary");
    expect(result).toStrictEqual(summaryJson);
});

test('Returns summary of random article mobile sections', async () => {
    requestMock.mockImplementation(async () => { return mobileSections });
    const result = await wiki.random("mobile-sections");
    expect(result).toStrictEqual(mobileSections);
});

test('Returns summary of random article title', async () => {
    requestMock.mockImplementation(async () => { return title });
    const result = await wiki.random("title");
    expect(result).toStrictEqual(title);
});

test('Request includes arg provided to method', async () => {
    requestMock.mockImplementation(async () => { return summaryJson });
    const result = await wiki.random("summary");
    expect(result).toStrictEqual(summaryJson);
    expect(requestMock).toBeCalledWith(`page/random/summary`);
});

test('Calling random with no arguments', async () => {
    requestMock.mockImplementation(async () => { return summaryJson });
    const result = await wiki.random();
    expect(result).toStrictEqual(summaryJson);
    expect(requestMock).toBeCalledWith(`page/random/summary`);
});
