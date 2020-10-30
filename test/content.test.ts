import { contentError } from '../source/errors';
import Page, { content } from '../source/page';
import * as request from '../source/request';
import wiki from "../source/index";
import * as utils from '../source/utils'
import { pageJson } from './samples';
const requestMock = jest.spyOn(request, "default");
const setTitleMock = jest.spyOn(utils, "setTitleForPage");

const contentMock = {
    500: { revisions: [{ revid: "100", parentid: "200" }],
    extract: "This is the content" }
}

const contentResult = "This is the content"

const contentWithIds = {
    result: contentResult,
    ids: {
        revisionId: "100",
        parentId: "200"
    }
}

afterAll(() => {
    requestMock.mockRestore();
    setTitleMock.mockRestore();
})

test('content method on page object returns without calling request if _content field set', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: contentMock } } });
    const page = new Page(pageJson);
    page._content = "Test content"
    const result = await page.content();
    expect(requestMock).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(page._content);
});

test('content method on page object returns content', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: contentMock } } });
    const page = new Page(pageJson);
    const result = await page.content({redirect: true});
    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(contentResult);
});

test('content method on page throws content error if response is empty', async () => {
    requestMock.mockImplementation(async () => { return [] });
    const page = new Page(pageJson);
    const t = async () => {
        await page.content();
    };
    expect(t).rejects.toThrowError(contentError);
});

test('Throws content error if response is empty', async () => {
    requestMock.mockImplementation(async () => { return [] });
    const t = async () => {
        await content("Test")
    };
    expect(t).rejects.toThrowError(contentError);
});

test('Returns with results as string', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: contentMock } } });
    const result = await content("Test");
    expect(result).toStrictEqual(contentWithIds);
});

test('content method on index throws content error if response is empty', async () => {
    requestMock.mockImplementation(async () => { return [] });
    const t = async () => {
        await wiki.content("Test")
    };
    expect(t).rejects.toThrowError(contentError);
});

test('content method on index returns a string', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: contentMock } } });
    const result = await wiki.content("Test");
    expect(setTitleMock).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(contentResult);
});

test('content method on index returns a string even when autosuggest is true', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: contentMock } } });
    setTitleMock.mockImplementation(async () => { return "test" });
    const result = await wiki.content("Test", { autoSuggest: true });
    expect(setTitleMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(contentResult);
});