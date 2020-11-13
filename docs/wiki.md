# Wiki

## Highlights

- [Functions](#functions)
    - [search()](#search)
    - [page()][#page]

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

The main page method for the wiki. The title param can be either a string or a pageId. Returns a [Page][4] object which can be used to call any of the page methods.

```js
page = async (title: string, pageOptions?: pageOptions): Promise<Page>
```
- @param title - The title or pageId of the page. This is required.
- @param [pageOptions][3] - the options for the page
- @result[Page][4] - the summary object for the wiki page

```js
//example
const page = await wiki.page('Batman', {autoSuggest: true, preload:true, fields:["summary", "html"]});
```

[1]: https://github.com/dopecodez/wikipedia/blob/master/docs/optionTypes.md#searchOptions
[2]: https://github.com/dopecodez/wikipedia/blob/master/docs/resultTypes.md#wikiSearchResult
[3]: https://github.com/dopecodez/wikipedia/blob/master/docs/optionTypes.md#pageOptions
[4]: https://github.com/dopecodez/wikipedia/blob/master/docs/PAGE.md
