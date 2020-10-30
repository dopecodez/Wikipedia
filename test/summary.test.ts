import { summaryError } from '../source/errors';
import Page, { summary } from '../source/page';
import * as request from '../source/request';
import wiki from "../source/index";
import * as utils from '../source/utils'
import { pageJson, summaryJson } from './samples';
const requestMock = jest.spyOn(request, "makeRestRequest");
const setTitleMock = jest.spyOn(utils, "setTitleForPage");

const summaryMock = summaryJson;

afterAll(() => {
    requestMock.mockRestore();
    setTitleMock.mockRestore();
})

test('Summary method on page object returns without calling request if _summary field set', async () => {
    requestMock.mockImplementation(async () => { return summaryMock });
    const page = new Page(pageJson);
    page._summary = summaryMock;
    const result = await page.summary();
    expect(requestMock).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(page._summary);
});

test('Summary method on page object returns wikiSummary', async () => {
    requestMock.mockImplementation(async () => { return summaryMock });
    const page = new Page(pageJson);
    const result = await page.summary({redirect: true});
    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(summaryMock);
});

test('summary method on page throws summary error if response is error', async () => {
    requestMock.mockImplementation(async () => { throw new Error("This is an error") });
    const page = new Page(pageJson);
    const t = async () => {
        await page.summary()
    };
    expect(t).rejects.toThrowError(summaryError);
});

test('Throws summary error if response is error', async () => {
    requestMock.mockImplementation(async () => { throw new Error("This is an error") });
    const t = async () => {
        await summary("Test")
    };
    expect(t).rejects.toThrowError(summaryError);
});

test('Returns with results as wikiSummary', async () => {
    requestMock.mockImplementation(async () => { return summaryMock });
    const result = await summary("Test");
    expect(result).toStrictEqual(summaryMock);
});

test('summary method on index throws summary error if response is error', async () => {
    requestMock.mockImplementation(async () => { throw new Error("This is an error") });
    const t = async () => {
        await wiki.summary("Test")
    };
    expect(t).rejects.toThrowError(summaryError);
});

test('summary method on index returns wikiSummary', async () => {
    requestMock.mockImplementation(async () => { return summaryMock });
    const result = await wiki.summary("Test");
    expect(setTitleMock).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(summaryMock);
});

test('summary method on index returns a wikiSummary even when autosuggest is true', async () => {
    requestMock.mockImplementation(async () => { return summaryMock });
    setTitleMock.mockImplementation(async () => { return "test" });
    const result = await wiki.summary("Test", { autoSuggest: true });
    expect(setTitleMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(summaryMock);
});