import { coordinatesError } from '../dist/errors.js';
import Page, { coordinates } from '../dist/page.js';
import * as request from '../dist/request';
import wiki from "../dist/index";
import * as utils from '../dist/utils'
import { pageJson } from './samples';
const requestMock = jest.spyOn(request, "default");
const setTitleMock = jest.spyOn(utils, "setTitleForPage");

const coordinatesMock = {
    500: { coordinates: [{lat: 51.17, lon: 30.15, primary: "", globe: "earth"}] }
}

const coordinatesResult = {lat: 51.17, lon: 30.15, primary: "", globe: "earth"}

afterAll(() => {
    requestMock.mockRestore();
    setTitleMock.mockRestore();
})

test('Coordinates method on page object returns without calling request if _coordinates field set', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: coordinatesMock } } });
    const page = new Page(pageJson);
    page._coordinates = coordinatesResult;
    const result = await page.coordinates();
    expect(requestMock).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(page._coordinates);
});

test('Coordinates method on page object returns coordinates', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: coordinatesMock } } });
    const page = new Page(pageJson);
    const result = await page.coordinates();
    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(coordinatesResult);
});

test('Throws coordinates error if response is empty', async () => {
    requestMock.mockImplementation(async () => { return [] });
    const t = async () => {
        await coordinates("Test")
    };
    expect(t).rejects.toThrowError(coordinatesError);
});

test('Returns with results as coordinatesResult', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: coordinatesMock } } });
    const result = await coordinates("Test");
    expect(result).toStrictEqual(coordinatesResult);
});

test('coordinates method on index returns a coordinatesResult', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: coordinatesMock } } });
    const result = await wiki.coordinates("Test");
    expect(setTitleMock).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(coordinatesResult);
});

test('coordinates method on index returns a coordinatesResult even when autosuggest is true', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: coordinatesMock } } });
    setTitleMock.mockImplementation(async () => { return "test" });
    const result = await wiki.coordinates("Test", { autoSuggest: true });
    expect(setTitleMock).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(coordinatesResult);
});