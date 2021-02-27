import { eventsError } from '../source/errors';
import * as request from '../source/request';
import wiki from "../source/index";
import { eventsJson } from './samples';
const requestMock = jest.spyOn(request, "makeRestRequest");

const eventsMock = eventsJson;

afterAll(() => {
    requestMock.mockRestore();
})

test('Throws events error if response is error', async () => {
    requestMock.mockImplementation(async () => { throw new Error("This is an error") });
    const t = async () => {
        await wiki.onThisDay({})
    };
    expect(t).rejects.toThrowError(eventsError);
});

test('Returns with results as eventResult', async () => {
    requestMock.mockImplementation(async () => { return eventsMock });
    const result = await wiki.onThisDay();
    expect(result).toStrictEqual(eventsMock);
});

test('events method call with params passed', async () => {
    requestMock.mockImplementation(async () => { return eventsMock });
    const result = await wiki.onThisDay({ type: 'deaths', month: '6', day: '9' });
    expect(result).toStrictEqual(eventsMock);
    expect(requestMock).toBeCalledWith(`feed/onthisday/deaths/6/9`, true);
});