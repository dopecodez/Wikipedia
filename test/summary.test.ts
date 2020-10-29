import { summaryError } from '../dist/errors.js';
import Page, { summary } from '../dist/page.js';
import * as request from '../dist/request';
import wiki from "../dist/index";
import * as utils from '../dist/utils'
import { pageJson, summaryJson } from './pageExample';
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
    const result = await page.summary();
    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(summaryMock);
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