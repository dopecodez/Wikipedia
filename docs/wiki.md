# Wiki

## Highlights

- [Functions](#functions)
    - [search()](#search)

## Functions

### search

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

[1]: https://github.com/dopecodez/wikipedia/blob/master/docs/optionTypes.md#searchOptions
[2]: https://github.com/dopecodez/wikipedia/blob/master/docs/resultTypes.md#wikiSearchResult