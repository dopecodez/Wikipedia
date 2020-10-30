import { searchError, pageError } from '../dist/errors.js';
import * as request from '../dist/request';
import wiki from "../dist/index";
import Page from '../dist/page.js';
import * as utils from '../dist/utils';
const requestMock = jest.spyOn(request, "default");
const restRequestMock = jest.spyOn(request, "makeRestRequest");
import { pageJson, summaryJson } from './pageExample';
const setTitleMock = jest.spyOn(utils, "setTitleForPage");

const searchMock = {
    search: ["search1", "search2"],
    searchinfo: { suggestion: "suggest" }
}

const searchResult = {
    search: ["search1", "search2"],
    suggestion: "suggest"
}

const imageMock = {
    500: { pageid: 500, ns: 0, title: 'test', imagerepository: 'testRepo', imageinfo: [{ url: 'testUrl' }] },
    501: { pageid: 501, ns: 1, title: 'test', imagerepository: 'testRepo', imageinfo: [{ url: "testUrl" }] }
}

const imageResult = [{ pageid: 500, ns: 0, title: 'test', imagerepository: 'testRepo', imageinfo: [{ url: 'testUrl' }], url: 'testUrl' },
{ pageid: 501, ns: 1, title: 'test', imagerepository: 'testRepo', imageinfo: [{ url: 'testUrl' }], url: 'testUrl' }]

const pageObject = new Page(pageJson);

afterAll(() => {
    requestMock.mockRestore();
    setTitleMock.mockRestore();
})

test('Throws search error if some error occurs', async () => {
    requestMock.mockImplementationOnce(async () => { return { searchMock } });
    const t = async () => {
        await wiki.search("Test")
    };
    expect(t).rejects.toThrowError(searchError);
});

test('Search returns results as wikiSearchResult', async () => {
    requestMock.mockImplementationOnce(async () => { return { query: searchMock } });
    const result = await wiki.search("Test");
    expect(result).toStrictEqual(searchResult);
});

test('Search returns results as wikiSearchResult with suggestions as null', async () => {
    requestMock.mockImplementationOnce(async () => {
        return {
            query: {
                search: ["search1", "search2"]
            }
        }
    });
    const result = await wiki.search("Test", {suggestion: false});
    expect(result).toStrictEqual({
        search: ["search1", "search2"],
        suggestion: null
    });
});

test('Throws page error if result doesnt have page', async () => {
    requestMock.mockImplementationOnce(async () => { return { } });
    const t = async () => {
        await wiki.page("Test")
    };
    expect(t).rejects.toThrowError(pageError);
});

test('Page throws error if missing attribute present in page', async () => {
    requestMock.mockImplementationOnce(async () => { return { 500: {missing: ""}} });
    const t = async () => {
        await wiki.page("Test")
    };
    expect(t).rejects.toThrowError(pageError);
});

test('Page returns results as Page Class', async () => {
    requestMock.mockImplementationOnce(async () => { return { query: { pages: { 500: pageJson } } } });
    const result = await wiki.page("Test");
    expect(result.toString()).toStrictEqual(pageObject.toString());
});

test('Page returns results as Page Class with auto suggest set to true', async () => {
    requestMock.mockImplementationOnce(async () => { return { query: { pages: { 500: pageJson } } } });
    setTitleMock.mockImplementationOnce(async () => { return "test" });
    const result = await wiki.page("Test", {autoSuggest: true});
    expect(result.toString()).toStrictEqual(pageObject.toString());
});

test('Page returns results as Page Class and loads default fields when preload set to true', async () => {
    requestMock.mockImplementationOnce(async () => { return { query: { pages: { 500: pageJson } } } })
        .mockImplementationOnce(async () => { return { query: { pages: imageMock } } });
    restRequestMock.mockImplementation(async () => { return summaryJson })
    const result = await wiki.page("Test", { preload: true, autoSuggest: false });
    expect(result.toString()).toStrictEqual(pageObject.toString());
    expect(result._summary).toStrictEqual(summaryJson);
    expect(result._images).toStrictEqual(imageResult);
});

test('Page returns results as Page Class and loads fields present in fields when preload set to true', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: { 500: pageJson } } } });
    restRequestMock.mockImplementation(async () => { return summaryJson });
    const result = await wiki.page("Test", { preload: true, fields: ["summary"] });
    expect(result.toString()).toStrictEqual(pageObject.toString());
    expect(result._summary).toStrictEqual(summaryJson);
    expect(result._images).toBeFalsy();
});