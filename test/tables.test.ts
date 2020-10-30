import { infoboxError } from '../source/errors';
import Page, { tables } from '../source/page';
import * as request from '../source/request';
import wiki from "../source/index";
import * as utils from '../source/utils'
import { pageJson, tableJson } from './samples';
const requestMock = jest.spyOn(request, "default");
const setTitleMock = jest.spyOn(utils, "setTitleForPage");

const rawMock = { 500: { revisions: [tableJson] } };

const tablesResult = [[
    {
        awardsAndAchievements: 'style="background:#ccc;"\n! Year !! Award !! Notes'
    },
    { awardsAndAchievements: '2018' },
    { awardsAndAchievements: '2014' }
]]


afterAll(() => {
    requestMock.mockRestore();
    setTitleMock.mockRestore();
})

test('tables method on page object returns without calling request if _tables field set', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: rawMock } } });
    const page = new Page(pageJson);
    page._tables = tablesResult;
    const result = await page.tables();
    expect(requestMock).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(page._tables);
});

test('Tables method on page object returns tables as array', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: rawMock } } });
    const page = new Page(pageJson);
    const result = await page.tables({redirect: true});
    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(tablesResult);
});

test('Tables method on index throws infobox error if response is error', async () => {
    requestMock.mockImplementation(async () => { throw new Error("This is an error") });
    const page = new Page(pageJson);
    const t = async () => {
        await page.tables()
    };
    expect(t).rejects.toThrowError(infoboxError);
});

test('Throws infobox error if response is error', async () => {
    requestMock.mockImplementation(async () => { throw new Error("This is an error") });
    const t = async () => {
        await tables("Test")
    };
    expect(t).rejects.toThrowError(infoboxError);
});

test('Returns with results as array of any', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: rawMock } } });
    const result = await tables("Test", true);
    expect(result).toStrictEqual(tablesResult);
});

test('table method on index throws infobox error if response is error', async () => {
    requestMock.mockImplementation(async () => { throw new Error("This is an error") });
    const t = async () => {
        await wiki.tables("Test")
    };
    expect(t).rejects.toThrowError(infoboxError);
});

test('tables method on index returns tables as array', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: rawMock } } });
    const result = await wiki.tables("Test");
    expect(setTitleMock).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(tablesResult);
});

test('tables method on index returns array of tables even when autosuggest is true', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: rawMock } } });
    setTitleMock.mockImplementation(async () => { return "test" });
    const result = await wiki.tables("Test", { autoSuggest: true });
    expect(setTitleMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(tablesResult);
});