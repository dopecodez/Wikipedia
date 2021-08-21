import * as request from '../source/request';
import wiki from "../source/index";
import { htmlString, notFoundJson } from './samples';
import { pdfError } from '../source/errors';
import Page, { pdf } from '../source/page';
import { pageJson } from './samples';
import * as utils from '../source/utils'
const requestMock = jest.spyOn(request, "returnRestUrl");
const setTitleMock = jest.spyOn(utils, "setTitleForPage");

const pdfResult = "link/pdf"

afterAll(() => {
    requestMock.mockRestore();
    setTitleMock.mockRestore();
});

test('returns link of pdf on page', async () => {
    requestMock.mockImplementation(() => { return pdfResult });
    const page = new Page(pageJson);
    const result = await page.pdf();
    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(pdfResult);
});

test('throws pdf error on page', async () => {
    requestMock.mockImplementation(() => { throw Error("this is an error") });
    const page = new Page(pageJson);
    const t = async () => {
        await page.pdf();
    };
    expect(t).rejects.toThrowError(pdfError);
});

test('Throws pdf error', async () => {
    requestMock.mockImplementation(() => { throw new Error("This is an error") });
    const t = async () => {
        await pdf("Test")
    };
    expect(t).rejects.toThrowError(pdfError);
});

test('Returns link of pdf', async () => {
    requestMock.mockImplementation(() => { return pdfResult });
    const result = await pdf("Test");
    expect(result).toStrictEqual(pdfResult);
});

test('Returns link of pdf directly', async () => {
    requestMock.mockImplementation(() => { return pdfResult });
    const result = await wiki.pdf("ACID");
    expect(result).toStrictEqual(pdfResult);
});

test('throws pdf error directly', async () => {
    requestMock.mockImplementation(() => { throw new Error("This is an error") });
    const t = async () => {
        await wiki.pdf("ACID");
    };
    expect(t).rejects.toThrowError(pdfError);
});

test('Returns link of pdf directly', async () => {
    let pdfResultWithAllFormats = pdfResult + '/legal/mobile';
    requestMock.mockImplementation(() => { return pdfResultWithAllFormats });
    const result = await wiki.pdf("ACID", { autoSuggest: true, type: 'mobile', format: 'legal' });
    expect(result).toStrictEqual(pdfResultWithAllFormats);
});
