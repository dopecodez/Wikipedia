import { relatedError } from '../dist/errors.js';
import Page, { related } from '../dist/page.js';
import * as request from '../dist/request';
import wiki from "../dist/index";
import * as utils from '../dist/utils'
import { pageJson, summaryJson } from './pageExample';
const requestMock = jest.spyOn(request, "makeRestRequest");
const setTitleMock = jest.spyOn(utils, "setTitleForPage");

const relatedMock = [summaryJson, summaryJson];

afterAll(() => {
    requestMock.mockRestore();
    setTitleMock.mockRestore();
})

test('Related method on page object returns without calling request if _related field set', async () => {
    requestMock.mockImplementation(async () => { return relatedMock });
    const page = new Page(pageJson);
    page._related = relatedMock;
    const result = await page.related();
    expect(requestMock).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(page._related);
});

test('Related method on page object returns array of wikiSummary', async () => {
    requestMock.mockImplementation(async () => { return relatedMock });
    const page = new Page(pageJson);
    const result = await page.related();
    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(relatedMock);
});

test('Throws related error if response is error', async () => {
    requestMock.mockImplementation(async () => { throw new Error("This is an error") });
    const t = async () => {
        await related("Test")
    };
    expect(t).rejects.toThrowError(relatedError);
});

test('Returns with results as array of wikiSummary', async () => {
    requestMock.mockImplementation(async () => { return relatedMock });
    const result = await related("Test");
    expect(result).toStrictEqual(relatedMock);
});

test('related method on index returns array of wikiSummary', async () => {
    requestMock.mockImplementation(async () => { return relatedMock });
    const result = await wiki.related("Test");
    expect(setTitleMock).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(relatedMock);
});

test('related method on index returns a array of wikiSummary even when autosuggest is true', async () => {
    requestMock.mockImplementation(async () => { return relatedMock });
    setTitleMock.mockImplementation(async () => { return "test" });
    const result = await wiki.related("Test", { autoSuggest: true });
    expect(setTitleMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(relatedMock);
});