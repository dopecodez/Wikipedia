import { linksError } from '../dist/errors.js';
import Page, { references } from '../dist/page.js';
import * as request from '../dist/request';
import wiki from "../dist/index";
import * as utils from '../dist/utils'
import { pageJson } from './samples';
const requestMock = jest.spyOn(request, "default");
const setTitleMock = jest.spyOn(utils, "setTitleForPage");

const referenceMock = {
    500: { extlinks: [{"*":"Link1"}, {"*": "Link2"}] }
}

const referenceResult = ["Link1", "Link2"]

afterAll(() => {
    requestMock.mockRestore();
    setTitleMock.mockRestore();
})

test('References method on page object returns without calling request if _references field set', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: referenceMock } } });
    const page = new Page(pageJson);
    page._references = []
    const result = await page.references();
    expect(requestMock).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(page._references);
});

test('References method on page object returns array of strings', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: referenceMock } } });
    const page = new Page(pageJson);
    const result = await page.references();
    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(referenceResult);
});

test('Throws links error if response is empty', async () => {
    requestMock.mockImplementation(async () => { return [] });
    const t = async () => {
        await references("Test")
    };
    expect(t).rejects.toThrowError(linksError);
});

test('Returns empty if no external links are available', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: {500: {extlinks:[]}} } } });
    const result = await references("Test");
    expect(result).toStrictEqual([]);
});

test('Returns with results an array of string', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: referenceMock } } });
    const result = await references("Test");
    expect(result).toStrictEqual(referenceResult);
});

test('references method on index returns array of strings', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: referenceMock } } });
    const result = await wiki.references("Test");
    expect(setTitleMock).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(referenceResult);
});

test('references method on index returns array of strings even when autosuggest is true', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: referenceMock } } });
    setTitleMock.mockImplementation(async () => { return "test" });
    const result = await wiki.references("Test", { autoSuggest: true });
    expect(setTitleMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(referenceResult);
});