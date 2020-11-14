# Wiki

## Highlights

- [Functions](#functions)
    - [search()](#search)
    - [page()](#page)
    - [geoSearch()](#geoSearch)
    - [languages()](#languages)

## Functions

### search()

Returns the search result for the input string as [wikiSearchResult][2] object. Accepts two inputs, the first the query string and the second a [searchOptions][1] object.

```js
search = async (query: string, searchOptions?: searchOptions): Promise<wikiSearchResult>
```
- @param query - The string you want to search for. This is required.
- @param [searchOptions][1] - the options for the page
- @result[wikiSearchResult][2] - the summary object for the wiki page

```js
//example
const searchResults = await wiki.search('Batma', {suggestion: true, limit: 10});
console.log(searchResults.results) // The search results
console.log(searchResults.suggestion) // Suggestion string if suggestion set to true, null otherwise.
```

### page()

The main page method for the wiki. The title param can be either a string or a pageId. Returns a [Page][4] object which can be used to call any of the page methods. Use the `preload` and `fields` object present in [pageOptions][3] if you want to load multiple attributes of a page together.

```js
page = async (title: string, pageOptions?: pageOptions): Promise<Page>
```
- @param title - The title or pageId of the page. This is required.
- @param [pageOptions][3] - the options for the page
- @result[Page][4] - the summary object for the wiki page

```js
//example
const page = await wiki.page('Batman', {autoSuggest: true, preload:true, fields:["summary", "html"]});
const summary = await page.summary(); // Does not call API, returns summary immediately as it is preloaded
```

### geoSearch()

Searches for a page based on input `latitude`, `longitude` coordinates. Optionally takes a `limit` and `radius`(the search radius in meters) parameter in the [geoOptions][5] object. Returns an array of [geoSearchResult][6] object.

```js
geoSearch = async (latitude: number, longitude: number, geoOptions?: geoOptions): Promise<Array<geoSearchResult>>
```
- @param latitude - The latitude to search for. This is required.
- @param longitude - The longitude to search for. This is required.
- @param [geoOptions][5] - the options for the geo search.
- @result[geoSearchResult][6] - an array of geoSearchResult object.

```js
//example
const geoResult = await wiki.geoSearch(2.088, 4.023, { radius: 5000, limit: 20 });
console.log(geoResult[0]); // the closest page to given coordinates
```

### languages()

The array of languages available in wikipedia. Mainly meant for use before [setLang](#setLang) to check if the language is available before actually setting it. Returns an array of [languageResult][7] object.

```js
languages = async (): Promise<Array<languageResult>>
```
- @result[languageResult][6] - an array of languageResult object.

```js
//example
const languages = await wiki.languages();
```

[1]: https://github.com/dopecodez/wikipedia/blob/master/docs/optionTypes.md#searchOptions
[2]: https://github.com/dopecodez/wikipedia/blob/master/docs/resultTypes.md#wikiSearchResult
[3]: https://github.com/dopecodez/wikipedia/blob/master/docs/optionTypes.md#pageOptions
[4]: https://github.com/dopecodez/wikipedia/blob/master/docs/PAGE.md
[5]: https://github.com/dopecodez/wikipedia/blob/master/docs/optionTypes.md#geoOptions
[6]: https://github.com/dopecodez/wikipedia/blob/master/docs/resultTypes.md#geoSearchResult
[7]: https://github.com/dopecodez/wikipedia/blob/master/docs/resultTypes.md#languageResult

