import * as request from '../source/request';
import wiki from "../source/index";
import { htmlString, notFoundJson } from './samples';
import { htmlError } from '../source/errors';
import Page, { mobileHtml } from '../source/page';
import { pageJson } from './samples';
import * as utils from '../source/utils'
const requestMock = jest.spyOn(request, "makeRestRequest");
const setTitleMock = jest.spyOn(utils, "setTitleForPage");

const htmlResult = "<html></html>"

afterAll(() => {
    requestMock.mockRestore();
    setTitleMock.mockRestore();
});

test('mobilehtml method on page object returns without calling request if _mobileHtml field set', async () => {
    requestMock.mockImplementation(async () => { return htmlResult });
    const page = new Page(pageJson);
    page._mobileHtml = htmlResult;
    const result = await page.mobileHtml();
    expect(requestMock).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(page._mobileHtml);
});

test('mobilehtml method on page object returns html', async () => {
    requestMock.mockImplementation(async () => { return htmlResult });
    const page = new Page(pageJson);
    const result = await page.mobileHtml({redirect: true});
    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(htmlResult);
});

test('mobilehtml method on page throws html error if response is empty', async () => {
    requestMock.mockImplementation(async () => { throw new Error("This is an error") });
    const page = new Page(pageJson);
    const t = async () => {
        await page.mobileHtml();
    };
    expect(t).rejects.toThrowError(htmlError);
});

test('Throws mobilehtml error if response is empty', async () => {
    requestMock.mockImplementation(async () => { throw new Error("This is an error") });
    const t = async () => {
        await mobileHtml("Test")
    };
    expect(t).rejects.toThrowError(htmlError);
});

test('Returns with results as string', async () => {
    requestMock.mockImplementation(async () => { return htmlResult });
    const result = await mobileHtml("Test");
    expect(result).toStrictEqual(htmlResult);
});

test('Returns mobilehtml when page successfully queried', async () => {
    requestMock.mockImplementation(async () => { return htmlString });
    const result = await wiki.mobileHtml("ACID");
    expect(result).toStrictEqual(htmlString);
});

test('throws htmlError if error response', async () => {
    requestMock.mockImplementation(async () => { throw new Error("This is an error") });
    const t = async () => {
        await wiki.mobileHtml("ACID");
    };
    expect(t).rejects.toThrowError(htmlError);
});

test('Returns notFound if page not found', async () => {
    requestMock.mockImplementation(async () => { return notFoundJson });
    const result = await wiki.mobileHtml("does-not-exist-on-wikipedia");
    expect(result).toEqual(notFoundJson);
});

test('Returns empty body on redirect page with redirect set to false', async () => {
    requestMock.mockImplementation(async () => { return null });
    setTitleMock.mockImplementation(async () => { return "homestar" });
    const result = await wiki.mobileHtml("homestar", { autoSuggest: true, redirect: false });
    expect(setTitleMock).toHaveBeenCalledTimes(1);
    expect(result).toBeNull();
});
