import { relatedError } from '../source/errors';
import Page, { related } from '../source/page';
import * as request from '../source/request';
import wiki from "../source/index";
import * as utils from '../source/utils'
import { pageJson, summaryJson } from './samples';
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
    const result = await page.related({redirect: true});
    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(relatedMock);
});

test('Related method on page throws related error if response is error', async () => {
    requestMock.mockImplementation(async () => { throw new Error("This is an error") });
    const page = new Page(pageJson);
    const t = async () => {
        await page.related()
    };
    expect(t).rejects.toThrowError(relatedError);
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

test('related method on index throws related error if response is error', async () => {
    requestMock.mockImplementation(async () => { throw new Error("This is an error") });
    const t = async () => {
        await wiki.related("Test")
    };
    expect(t).rejects.toThrowError(relatedError);
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