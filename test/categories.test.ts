import { categoriesError } from '../dist/errors.js';
import Page, { categories } from '../dist/page.js';
import * as request from '../dist/request';
import wiki from "../dist/index";
import * as utils from '../dist/utils'
import { pageJson } from './pageResult';
const requestMock = jest.spyOn(request, "default");
const setTitleMock = jest.spyOn(utils, "setTitleForPage");

const categoryMock = {
    500: { categories: [{title:"Category1"}, {title: "Category2"}] }
}

const categoryResult = ["Category1", "Category2"]

afterAll(() => {
    requestMock.mockRestore();
    setTitleMock.mockRestore();
})

test('Category method on page object returns without calling request if _categories field set', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: categoryMock } } });
    const page = new Page(pageJson);
    page._categories = []
    const result = await page.categories();
    expect(requestMock).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(page._categories);
});

test('category method on page object returns array of strings', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: categoryMock } } });
    const page = new Page(pageJson);
    const result = await page.categories();
    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(categoryResult);
});

test('Throws category error if response if empty', async () => {
    requestMock.mockImplementation(async () => { return [] });
    const t = async () => {
        await categories("Test")
    };
    expect(t).rejects.toThrowError(categoriesError);
});

test('Returns empty if no categories are available', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: {500: {categories:[]}} } } });
    const result = await categories("Test");
    expect(result).toStrictEqual([]);
});

test('Returns with results an array of string', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: categoryMock } } });
    const result = await categories("Test");
    expect(result).toStrictEqual(categoryResult);
});

test('categories method on index returns array of strings', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: categoryMock } } });
    const result = await wiki.categories("Test");
    expect(setTitleMock).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(categoryResult);
});

test('category method on index returns array of strings even when autosuggest is true', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: categoryMock } } });
    setTitleMock.mockImplementation(async () => { return "test" });
    const result = await wiki.categories("Test", { autoSuggest: true });
    expect(setTitleMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(categoryResult);
});