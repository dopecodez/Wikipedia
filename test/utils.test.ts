import { isString, setTitleForPage, setPageIdOrTitleParam, setPageId } from '../source/utils';
import wiki from "../source/index";
import { pageError } from '../source/errors';
const searchMock = jest.spyOn(wiki, "search");

afterAll(() => {
    searchMock.mockRestore();
})

test('Is String returns false for numbers', () => {
    expect(isString(1)).toBe(false);
});

test('Is String returns true for strings', () => {
    expect(isString("test")).toBe(true);
});

test('Returns error if no suggestion or search results are present', async () => {
    searchMock.mockImplementation(async () => { return { suggestion: "", results: [] } });
    const t = async () => {
        await setTitleForPage("Test")
    };
    expect(t).rejects.toThrowError(pageError);
});

test('Returns suggestion if suggestion is present', async () => {
    searchMock.mockImplementation(async () => { return { suggestion: "Suggest", results: ['result'] } });
    const result = await setTitleForPage("Test");
    expect(result).toBe("Suggest");
});

test('Returns title if no suggestion but search results are present', async () => {
    searchMock.mockImplementation(async () => { return { suggestion: "", results: ['result'] } });
    const result = await setTitleForPage("Test");
    expect(result).toBe("Test");
});

test('Sets title param for string titles', () => {
    const params = {}
    const result = setPageIdOrTitleParam(params, "Test")
    expect(result.titles).toBe("Test");
});

test('Sets page ids params for number titles', () => {
    const params = {}
    const result = setPageIdOrTitleParam(params, "112")
    expect(result.pageids).toBe("112");
});

test('Sets pageId from params if present', () => {
    const params = { pageIds: 500 }
    const result = setPageId(params, "");
    expect(result).toBe(500);
});

test('Sets pageid from result if not present in params', () => {
    const output = { query: { pages: { 500: {} } } }
    const result = setPageId({}, output);
    expect(result).toBe("500");
});

test('Returns the correct title if given url', async () => {
    const result = await setTitleForPage("https://en.wikipedia.org/wiki/Batman", { url: true });
    expect(result).toBe("Batman");
});

test('Returns the correct title if url has special chars in title', async () => {
    const result = await setTitleForPage("https://en.wikipedia.org/wiki/666_(number)", { url: true });
    expect(result).toBe("666_(number)");
});

test('Throws error if url not wikipedia', async () => {
    const t = async () => {
        await setTitleForPage("https://example.com/666_(number)", { url: true });
    };
    expect(t).rejects.toThrowError(pageError);
});

