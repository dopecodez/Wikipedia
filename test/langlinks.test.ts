import { linksError } from '../source/errors';
import Page, { langLinks } from '../source/page';
import * as request from '../source/request';
import wiki from "../source/index";
import * as utils from '../source/utils'
import { pageJson } from './samples';
const requestMock = jest.spyOn(request, "default");
const setTitleMock = jest.spyOn(utils, "setTitleForPage");

const langLinkskMock = {
    500: { langlinks: [{"*":"Link1", lang: "en", url: "url1"}, {"*": "Link2", lang: "fr", url: "url2"}] }
}

const langLinksResult = [{title:"Link1", lang: "en", url: "url1"}, {title: "Link2", lang: "fr", url: "url2"}]

afterAll(() => {
    requestMock.mockRestore();
    setTitleMock.mockRestore();
})

test('Lang links method on page object returns without calling request if _langlinks field set', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: langLinkskMock } } });
    const page = new Page(pageJson);
    page._langLinks = []
    const result = await page.langLinks();
    expect(requestMock).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(page._langLinks);
});

test('lang links method on page object returns array of langLinksResult', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: langLinkskMock } } });
    const page = new Page(pageJson);
    const result = await page.langLinks();
    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(langLinksResult);
});

test('lang links method on page throws links error if response is empty', async () => {
    requestMock.mockImplementation(async () => { return [] });
    const page = new Page(pageJson);
    const t = async () => {
        await page.langLinks()
    };
    expect(t).rejects.toThrowError(linksError);
});

test('Throws links error if response is empty', async () => {
    requestMock.mockImplementation(async () => { return [] });
    const t = async () => {
        await langLinks("Test")
    };
    expect(t).rejects.toThrowError(linksError);
});

test('Returns empty if no lang links are available', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: {500: {langlinks:[]}} } } });
    const result = await langLinks("Test");
    expect(result).toStrictEqual([]);
});

test('Returns with results an array of langLinksResult object', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: langLinkskMock } } });
    const result = await langLinks("Test");
    expect(result).toStrictEqual(langLinksResult);
});

test('lang links method on index throws links error if response is empty', async () => {
    requestMock.mockImplementation(async () => { return [] });
    const t = async () => {
        await wiki.langLinks("Test")
    };
    expect(t).rejects.toThrowError(linksError);
});

test('lang links method on index returns array of langLinksResult object', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: langLinkskMock } } });
    const result = await wiki.langLinks("Test");
    expect(setTitleMock).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(langLinksResult);
});

test('lang links method on index returns array of langLinksResult even when autosuggest is true', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: langLinkskMock } } });
    setTitleMock.mockImplementation(async () => { return "test" });
    const result = await wiki.langLinks("Test", { autoSuggest: true });
    expect(setTitleMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(langLinksResult);
});