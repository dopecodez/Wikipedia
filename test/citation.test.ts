import * as request from '../source/request';
import wiki, { citationError } from "../source/index";
import { mobileSections, citationData, title } from './samples';
import Page, { citation } from '../source/page';
import { pageJson } from './samples';
const requestMock = jest.spyOn(request, "makeRestRequest");

afterAll(() => {
    requestMock.mockRestore();
})

test('Throws error if response is error', async () => {
    requestMock.mockImplementation(async () => { throw new Error("This is an error") });
    const err = async () => { await wiki.citation("test", "mediawiki", "fr") };
    expect(err).rejects.toThrowError(citationError);
});

test('Returns citation data', async () => {
    requestMock.mockImplementation(async () => { return citationData });
    const result = await wiki.citation("test", "mediawiki");
    expect(result).toStrictEqual(citationData);
});

test('Returns summary and format as wikimedia by default', async () => {
    requestMock.mockImplementation(async () => { return citationData });
    const result = await wiki.citation("test");
    expect(result).toStrictEqual(citationData);
});

test('Throws category error if response is empty', async () => {
    requestMock.mockImplementation(async () => { throw new Error("This is an error") });
    const t = async () => {
        await citation("Test")
    };
    expect(t).rejects.toThrowError(citationError);
});

test('Returns citation data', async () => {
    requestMock.mockImplementation(async () => { return  citationData });
    const result = await citation("Test");
    expect(result).toStrictEqual(citationData);
});