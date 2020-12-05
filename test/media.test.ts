import { mediaError } from '../source/errors';
import Page, { media } from '../source/page';
import * as request from '../source/request';
import wiki from "../source/index";
import * as utils from '../source/utils'
import { pageJson, mediaJson } from './samples';
const requestMock = jest.spyOn(request, "makeRestRequest");
const setTitleMock = jest.spyOn(utils, "setTitleForPage");

afterAll(() => {
    requestMock.mockRestore();
    setTitleMock.mockRestore();
})

test('media method on page object returns without calling request if _media field set', async () => {
    requestMock.mockImplementation(async () => { return mediaJson });
    const page = new Page(pageJson);
    page._media = mediaJson;
    const result = await page.media();
    expect(requestMock).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(page._media);
});

test('media method on page object returns wikiMediaResult with array of mediaResults', async () => {
    requestMock.mockImplementation(async () => { return mediaJson });
    const page = new Page(pageJson);
    const result = await page.media({redirect: true});
    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(mediaJson);
});

test('media method on page throws media error if response is error', async () => {
    requestMock.mockImplementation(async () => { throw new Error("This is an error") });
    const page = new Page(pageJson);
    const t = async () => {
        await page.media()
    };
    expect(t).rejects.toThrowError(mediaError);
});

test('Throws media error if response is error', async () => {
    requestMock.mockImplementation(async () => { throw new Error("This is an error") });
    const t = async () => {
        await media("Test")
    };
    expect(t).rejects.toThrowError(mediaError);
});

test('Returns with results as wikiMediaResult', async () => {
    requestMock.mockImplementation(async () => { return mediaJson });
    const result = await media("Test");
    expect(result).toStrictEqual(mediaJson);
});

test('media method on index throws media error if response is error', async () => {
    requestMock.mockImplementation(async () => { throw new Error("This is an error") });
    const t = async () => {
        await wiki.media("Test")
    };
    expect(t).rejects.toThrowError(mediaError);
});

test('related method on index returns wikiMediaResult', async () => {
    requestMock.mockImplementation(async () => { return mediaJson });
    const result = await wiki.media("Test");
    expect(setTitleMock).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(mediaJson);
});

test('media method on index returns wikiMediaResult even when autosuggest is true', async () => {
    requestMock.mockImplementation(async () => { return mediaJson });
    setTitleMock.mockImplementation(async () => { return "test" });
    const result = await wiki.related("Test", { autoSuggest: true });
    expect(setTitleMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(mediaJson);
});