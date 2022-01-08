import { fcError } from '../source/errors';
import * as request from '../source/request';
import wiki from "../source/index";
import { fcData } from './samples';
const requestMock = jest.spyOn(request, "makeRestRequest");

const fcMock = fcData;

afterAll(() => {
    requestMock.mockRestore();
})

test('Throws featured content error if response is error', async () => {
    requestMock.mockImplementation(async () => { throw new Error("This is an error") });
    const result = async () => {
        await wiki.featuredContent({})
    };
    expect(result).rejects.toThrowError(fcError);
});

test('Returns with results as fcResult', async () => {
    requestMock.mockImplementation(async () => { return fcMock });
    const result = await wiki.featuredContent();
    expect(result).toStrictEqual(fcMock);
});

test('Featured content method call with params passed and no padding', async () => {
    requestMock.mockImplementation(async () => { return fcMock });
    const result = await wiki.featuredContent({ year: '2020', month: '1', day: '1' });
    expect(result).toStrictEqual(fcMock);
    expect(requestMock).toBeCalledWith(`feed/featured/2020/01/01`, true);
});

test('Featured content method call with params passed', async () => {
    requestMock.mockImplementation(async () => { return fcMock });
    const result = await wiki.featuredContent({ year: '2020', month: '01', day: '01' });
    expect(result).toStrictEqual(fcMock);
    expect(requestMock).toBeCalledWith(`feed/featured/2020/01/01`, true);
});