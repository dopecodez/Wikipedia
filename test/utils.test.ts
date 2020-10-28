import { isString, setTitleForPage } from '../dist/utils.js';
import wiki from "../dist/index";
import { pageError } from '../dist/errors';
const searchMock = jest.spyOn(wiki, "search");

test('Is String returns false for numbers', () => {
    expect(isString(1)).toBe(false);
});

test('Is String returns true for strings', () => {
    expect(isString("test")).toBe(true);
});

test('Returns error if no suggestion or search results are present', async () => {
    searchMock.mockImplementation(async() => {return {suggestion: null, search: []}});
    const t = async () => {
        await setTitleForPage("Test")
    };
    expect(t).rejects.toThrowError(pageError);
});

test('Returns suggestion if suggestion is present', async () => {
    searchMock.mockImplementation(async() => {return {suggestion: "Suggest", search: ['result']}});
    const result = await setTitleForPage("Test");
    expect(result).toBe("Suggest");
});

test('Returns title if no suggestion but search results are present', async () => {
    searchMock.mockImplementation(async() => {return {suggestion: null, search: ['result']}});
    const result = await setTitleForPage("Test");
    expect(result).toBe("Test");
});
