import * as request from '../source/request';
import wiki from "../source/index";
import { summaryJson } from './samples';
const requestMock = jest.spyOn(request, "makeRestRequest");

afterAll(() => {
    requestMock.mockRestore();
})

test('Throws error if response is error', async () => {
    requestMock.mockImplementation(async () => { throw new Error("This is an error") });
    const err = async () => { await wiki.random("some_arg") };
    expect(err).rejects.toThrowError(Error);
});

test('Returns summary of random article', async () => {
    requestMock.mockImplementation(async () => { return summaryJson });
    const result = await wiki.random("summary");
    expect(result).toStrictEqual(summaryJson);
});

test('Request includes arg provided to method', async () => {
    requestMock.mockImplementation(async () => { return summaryJson });
    const result = await wiki.random("summary");
    expect(result).toStrictEqual(summaryJson);
    expect(requestMock).toBeCalledWith(`page/random/summary`);
});
