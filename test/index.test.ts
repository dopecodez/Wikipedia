import { searchError, pageError, geoSearchError, wikiError, autocompletionsError } from '../source/errors';
import * as request from '../source/request';
import wiki from "../source/index";
import Page from '../source/page';
import * as utils from '../source/utils';
const requestMock = jest.spyOn(request, "default");
const restRequestMock = jest.spyOn(request, "makeRestRequest");
import { pageJson, summaryJson } from './samples';
const setTitleMock = jest.spyOn(utils, "setTitleForPage");

const searchMock = {
    search: ["search1", "search2"],
    searchinfo: { suggestion: "suggest" }
}

const searchResult = {
    results: ["search1", "search2"],
    suggestion: "suggest"
}

const imageMock = {
    500: { pageid: 500, ns: 0, title: 'test', imagerepository: 'testRepo', imageinfo: [{ url: 'testUrl' }] },
    501: { pageid: 501, ns: 1, title: 'test', imagerepository: 'testRepo', imageinfo: [{ url: "testUrl" }] }
}

const imageResult = [{ pageid: 500, ns: 0, title: 'test', imagerepository: 'testRepo', imageinfo: [{ url: 'testUrl' }], url: 'testUrl' },
{ pageid: 501, ns: 1, title: 'test', imagerepository: 'testRepo', imageinfo: [{ url: 'testUrl' }], url: 'testUrl' }]

const autocompletionsMock = ["Test", ["Test", "Testosterone", "Testicle", "Test cricket", "Test-driven development"]]

const pageObject = new Page(pageJson);

afterAll(() => {
    requestMock.mockRestore();
    setTitleMock.mockRestore();
    restRequestMock.mockRestore();
})

test('Default wiki returns results as Page Class', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: { 500: pageJson } } } });
    const result = await wiki("Test");
    expect(result.toString()).toStrictEqual(pageObject.toString());
});

test('Throws search error if some error occurs', async () => {
    requestMock.mockImplementation(async () => { return { searchMock } });
    const t = async () => {
        await wiki.search("Test")
    };
    expect(t).rejects.toThrowError(searchError);
});

test('Search returns results as wikiSearchResult', async () => {
    requestMock.mockImplementation(async () => { return { query: searchMock } });
    const result = await wiki.search("Test", {suggestion: true});
    expect(result).toStrictEqual(searchResult);
});

test('Search returns results as wikiSearchResult with suggestions as null', async () => {
    requestMock.mockImplementation(async () => {
        return {
            query: {
                search: ["search1", "search2"]
            }
        }
    });
    const result = await wiki.search("Test", {suggestion: false});
    expect(result).toStrictEqual({
        results: ["search1", "search2"],
        suggestion: null
    });
});

test('Autocompletions returns results as array of strings', async () => {
  requestMock.mockImplementation(async () => { return autocompletionsMock });
  const result = await wiki.autocompletions("Test");
  expect(result).toStrictEqual(
    ["Test", "Testosterone", "Testicle", "Test cricket", "Test-driven development"]
  );
});

test('Throws autocompletions error if some error occurs', async () => {
  requestMock.mockImplementation(async () => { return { autocompletionsMock } });
  const t = async () => {
      await wiki.autocompletions("Test")
  };
  expect(t).rejects.toThrowError(autocompletionsError);
});

test('Throws page error if result doesnt have page', async () => {
    requestMock.mockImplementation(async () => { return { } });
    const t = async () => {
        await wiki.page("Test")
    };
    expect(t).rejects.toThrowError(pageError);
});

test('Page throws error if missing attribute present in page', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: { 500: { missing: '' } } } } });
    const t = async () => {
        await wiki.page("Test")
    };
    expect(t).rejects.toThrowError(pageError);
});

test('Page returns results as Page Class', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: { 500: pageJson } } } });
    const result = await wiki.page("Test");
    expect(result.toString()).toStrictEqual(pageObject.toString());
});

test('Page returns results as Page Class with auto suggest set to true', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: { 500: pageJson } } } });
    setTitleMock.mockImplementation(async () => { return "test" });
    const result = await wiki.page("Test", {autoSuggest: true});
    expect(result.toString()).toStrictEqual(pageObject.toString());
});

test('Page returns results as Page Class and loads default fields when preload set to true', async () => {
    requestMock.mockImplementationOnce(async () => { return { query: { pages: { 500: pageJson } } } })
        .mockImplementationOnce(async () => { return { query: { pages: imageMock } } });
    restRequestMock.mockImplementation(async () => { return summaryJson })
    const result = await wiki.page("Test", { preload: true, autoSuggest: false });
    expect(result.toString()).toStrictEqual(pageObject.toString());
    expect(result._summary).toStrictEqual(summaryJson);
    expect(result._images).toStrictEqual(imageResult);
});

test('Page returns results as Page Class and loads fields present in fields when preload set to true', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: { 500: pageJson } } } });
    restRequestMock.mockImplementation(async () => { return summaryJson });
    const result = await wiki.page("Test", { preload: true, fields: ["summary"] });
    expect(result.toString()).toStrictEqual(pageObject.toString());
    expect(result._summary).toStrictEqual(summaryJson);
    expect(result._images).toBeFalsy();
});

test('Page returns results as Page Class and loads fields present in fields when preload set to true', async () => {
    requestMock.mockImplementation(async () => { return { query: { pages: { 500: pageJson } } } });
    restRequestMock.mockImplementation(async () => { return summaryJson });
    const t = async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Type error
        await wiki.page("Test", { preload: true, fields: ["errorMethod"] })
    };
    expect(t).rejects.toThrowError(pageError);
});

test('Languages method throws wikiError if error', async () => {
    requestMock.mockImplementation(async () => { throw new Error("error")});
    const t = async () => {
        await wiki.languages();
    };
    expect(t).rejects.toThrowError(wikiError);
});

test('Languages method returns array of languageResult', async () => {
    requestMock.mockImplementation(async () => { return { query: { languages: [{ code: "test1", "*": "" }, { code: "test2", "*": "" }] } } });
    const result = await wiki.languages();
    expect(result).toStrictEqual([{ "test1": "" }, { "test2": "" }]);
});

test('Set language returns api url with language set', () => {
    const result = wiki.setLang("mal");
    expect(result).toStrictEqual("https://mal.wikipedia.org/w/api.php?");
});

test('Geo search error is thrown in case of error', async () => {
    requestMock.mockImplementation(async () => { return {} });
    const t = async () => {
        await wiki.geoSearch(2.088, 4.023)
    };
    expect(t).rejects.toThrowError(geoSearchError);
});

test('geoSearch returns results as geoSearchResult', async () => {
    requestMock.mockImplementation(async () => { return { query: { geosearch: [] } } });
    const result = await wiki.geoSearch(2.088, 4.023);
    expect(result).toStrictEqual([]);
});

test('geoSearch returns results as geoSearchResult with options', async () => {
    requestMock.mockImplementation(async () => { return { query: { geosearch: [] } } });
    const result = await wiki.geoSearch(2.088, 4.023, { radius: 5000, limit: 20 });
    expect(requestMock).toHaveBeenCalledWith(
        {
            'list': 'geosearch',
            'gsradius': 5000,
            'gscoord': `${2.088}|${4.023}`,
            'gslimit': 20,
            'gsprop': 'type'
        }
    );
    expect(result).toStrictEqual([]);
});

test('Search error is thrown in case of error in suggest', async () => {
    requestMock.mockImplementation(async () => { throw new Error("Error") });
    const t = async () => {
        await wiki.suggest("Test")
    };
    expect(t).rejects.toThrowError(searchError);
});

test('Suggest returns null if suggestion not present', async () => {
    requestMock.mockImplementation(async () => { return { query: { searchinfo: {} } } });
    const result = await wiki.suggest("test");
    expect(result).toStrictEqual(null);
});

test('Suggest returns string', async () => {
    requestMock.mockImplementation(async () => { return { query: { searchinfo: {suggestion: "suggest"} } } });
    const result = await wiki.suggest("test");
    expect(result).toStrictEqual("suggest");
});