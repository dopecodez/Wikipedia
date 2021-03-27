# Wiki

## Highlights

- [Functions](#functions)
    - [search()](#search)
    - [page()](#page)
    - [geoSearch()](#geoSearch)
    - [onThisDay()](#onThisDay)
    - [languages()](#languages)
    - [setLang()](#setLang)
    - [suggest()](#suggest)
    - [random()](#random)
    - [Page Methods](#page-methods)

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
### onThisDay()

Returns the events that happened on a day depending on input `type`, `month`, `day` arguments. Type can be any one of the ones defined in [eventOptions][23]. By default, it will return all events that happened on the current day. All options are documented in the [eventOptions][23] object. Returns a array of [eventResult][24] object which internally has arrays of [wikiSummary][22].

```js
onThisDay = async ({type: string, month: string, day: string}): Promise<eventResult>
```
- @param type - Any one of the valid event types. By default, `all`.
- @param month - The month to search for. Takes current month by default.
- @param day - The day to search for. Takes current day by default.
- @result[eventResult][24] - a eventResult object.

```js
//example
const events = await wiki.onThisDay();
const deaths = await wiki.onThisDay({type:'deaths', month:'2', day:'28'});
console.log(events); // returns all the events which happened today
console.log(deaths); // returns all deaths which happened on Feb 28
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

### setLang()

Uses the input language code to set language for the wikimedia and the REST APIs. This is useful in case you want to switch languages while using wikipedia.

```js
setLang = (language: string): string
```
- @param language - The language code for the wiki.
- @result Returns the new wikimedia url as string.

```js
//example
const changedLang = await wiki.setLang('fr'); // sets language to french
```

### suggest()

Returns the wiki suggestion for a given query string. This method returns null if no suggestion was returned.

```js
suggest = async (query: string): Promise<string | null>
```
- @param query - The query string.
- @result the suggestion or null if no suggestion present.

```js
//example
const suggestion = await wiki.suggest('Batma');
console.log(suggestion); //Returns 'Batman'
```

### random()

Returns a random wiki page in any of the available formats. Formats can be `summary`, `title`, `related`, `mobile-sections` or `mobile-sections-lead`. Defaults to summary by default.

```js
random = async (format?: randomFormats): Promise<wikiSummary | title | relatedResult | string>
```
- @param format - the format for the random page
- @result the random page in requested format

```js
//example
const randomSummary = await wiki.random();
console.log(random); //Returns wikiSummary of a random pageOption
const randomMobileSections = await wiki.random("mobile-sections");
console.log(randomMobileSections); // Returns random mobile sections for a page
```

### Page Methods

All the methods defined in the [Page][4] documentation can be called directly from the wiki object as well. This includes [summary()][8], [images()][9], [intro()][10], [html()][11], [related()][12], [content()][13], [categories()][14], [links()][15], [references()][16], [coordinates()][17], [langLinks()][18], [infobox()][19], and [tables()][20].

**Read up [here][21] to understand when you should use these methods directly and when you should use the page methods**.
Also, note that if called directly from the wiki object, you can use the `autoSuggest` option present in the [pageOptions][3] object which will be ignored if called through page.
```js
//example
const summary = await wiki.summary('Batma', {autoSuggest:true});
console.log(summary); //Returns summary for 'Batman'
const html = await wiki.summary('David Attenborough');
console.log(html); //Returns html for the environmentalist
```

[1]: https://github.com/dopecodez/wikipedia/blob/master/docs/optionTypes.md#searchOptions
[2]: https://github.com/dopecodez/wikipedia/blob/master/docs/resultTypes.md#wikiSearchResult
[3]: https://github.com/dopecodez/wikipedia/blob/master/docs/optionTypes.md#pageOptions
[4]: https://github.com/dopecodez/wikipedia/blob/master/docs/PAGE.md
[5]: https://github.com/dopecodez/wikipedia/blob/master/docs/optionTypes.md#geoOptions
[6]: https://github.com/dopecodez/wikipedia/blob/master/docs/resultTypes.md#geoSearchResult
[7]: https://github.com/dopecodez/wikipedia/blob/master/docs/resultTypes.md#languageResult
[8]: https://github.com/dopecodez/wikipedia/blob/master/docs/PAGE.md#summary
[9]: https://github.com/dopecodez/wikipedia/blob/master/docs/PAGE.md#images
[10]: https://github.com/dopecodez/wikipedia/blob/master/docs/PAGE.md#intro
[11]: https://github.com/dopecodez/wikipedia/blob/master/docs/PAGE.md#html
[12]: https://github.com/dopecodez/wikipedia/blob/master/docs/PAGE.md#related
[13]: https://github.com/dopecodez/wikipedia/blob/master/docs/PAGE.md#content
[14]: https://github.com/dopecodez/wikipedia/blob/master/docs/PAGE.md#categories
[15]: https://github.com/dopecodez/wikipedia/blob/master/docs/PAGE.md#links
[16]: https://github.com/dopecodez/wikipedia/blob/master/docs/PAGE.md#references
[17]: https://github.com/dopecodez/wikipedia/blob/master/docs/PAGE.md#coordinates
[18]: https://github.com/dopecodez/wikipedia/blob/master/docs/PAGE.md#langLinks
[19]: https://github.com/dopecodez/wikipedia/blob/master/docs/PAGE.md#infobox
[20]: https://github.com/dopecodez/wikipedia/blob/master/docs/PAGE.md#tables
[21]: https://github.com/dopecodez/wikipedia/blob/master/docs/USAGE.md#when-to-use-page
[22]: https://github.com/dopecodez/wikipedia/blob/master/docs/resultTypes.md#wikiSummary
[23]: https://github.com/dopecodez/wikipedia/blob/master/docs/optionTypes.md#eventOptions
[24]: https://github.com/dopecodez/wikipedia/blob/master/docs/resultTypes.md#eventResult


