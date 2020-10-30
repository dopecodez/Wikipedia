import { htmlError } from '../dist/errors.js';
import Page, { html } from '../dist/page.js';
import * as request from '../dist/request';
import wiki from "../dist/index";
import * as utils from '../dist/utils'
import { pageJson } from './samples';
const requestMock = jest.spyOn(request, "default");
const setTitleMock = jest.spyOn(utils, "setTitleForPage");

const htmlMock = {
    500: { revisions: [{ "*": "<html></html>" }] }
}

const htmlResult = "<html></html>"

afterAll(() => {
    requestMock.mockRestore();
    setTitleMock.mockRestore();
})

test('html method on page object returns without calling request if _html field set', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: htmlMock } } });
    const page = new Page(pageJson);
    page._html = "<body></body>"
    const result = await page.html();
    expect(requestMock).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(page._html);
});

test('html method on page object returns html', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: htmlMock } } });
    const page = new Page(pageJson);
    const result = await page.html();
    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(htmlResult);
});

test('Throws html error if response is empty', async () => {
    requestMock.mockImplementation(async () => { return [] });
    const t = async () => {
        await html("Test")
    };
    expect(t).rejects.toThrowError(htmlError);
});

test('Returns with results as string', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: htmlMock } } });
    const result = await html("Test");
    expect(result).toStrictEqual(htmlResult);
});

test('html method on index returns a string', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: htmlMock } } });
    const result = await wiki.html("Test");
    expect(setTitleMock).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(htmlResult);
});

test('html method on index returns a string even when autosuggest is true', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: htmlMock } } });
    setTitleMock.mockImplementation(async () => { return "test" });
    const result = await wiki.html("Test", { autoSuggest: true });
    expect(setTitleMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(htmlResult);
});