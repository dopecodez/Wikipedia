# Input Options

## Highlights

- [pageOptions](#pageOptions)
- [listOptions](#listOptions)
- [searchOptions](#searchOptions)
- [geoOptions](#geoOptions)
- [eventOptions](#eventOptions)
- [fcOptions](#fcOptions)
- [pdfOptions](#pdfOptions)
- [autocompletionOptions](#autocompletionoptions)

### pageOptions

```js
interface pageOptions {
    autoSuggest?: boolean
    redirect?: boolean
    preload?: boolean
    fields?: Array<pageFunctions>
    url?: boolean
}
```
The options for page methods on `Page` or `wiki`. Generally, can be used for all page methods which do not return a array.

- `redirect : boolean`(default = true) - redirect in case wikipedia returns a 304. **This is the only field that is applicable to any method called on a [Page][1] object**.
- `autoSuggest : boolean`(default = false) - suggest a page title which is reccomened by wikipedia for given string. Useful in case you are using user input to get details for a page.
- `url : boolean`(default = false) - allows you to pass a valid wikipedia url in the title to get the information of that page.

The other two fields are only applicable if added on the `wiki.page('title')` method, otherwise its ignored.

- `preload : boolean`(default = false) - When used with fields, it can preload any fields for the page(Loads summary by default if used without `fields` argument). This is helpful in case you want the whole loading to take place in one single step instead of calling each field when required.
- `fields : string[]` - Accepts a array of string which should a combination the functions available on page(Accepted values are combinations of: 'summary','images','intro','html,'content','categories','links','references','coordinates','langLinks','infobox','tables','related').

### listOptions

```js
interface listOptions {
    autoSuggest?: boolean
    redirect?: boolean
    limit?: number
    url?: boolean
}
```
The options for page methods on `Page` or `wiki`. Generally, can be used for all page methods which return an array

- `autoSuggest : boolean`(default = false) - suggest a page title which is reccomened by wikipedia for given search string*
- `redirect : boolean`(default = true) - redirect in case wikipedia returns a 304
- `limit : number`(default = 10) - Use this to increase/decrease number of results in the returned array
- `url : boolean`(default = false) - allows you to pass a valid wikipedia url in the title to get the information of that page.

### searchOptions

```js
interface searchOptions {
    limit?: number // the number of results
    suggestion?: boolean // Loads the autosuggested value along with search results
}
```
- `limit : number`(default = 10) - Use this to increase/decrease number of results in the returned search result array
- `suggestion: boolean`(default=false) - If set to true, returns the auto suggested page along with search results

### geoOptions
```js
interface geoOptions {
    limit?: number
    radius?: number
}
```
- `limit : number`(default = 10) - Use this to increase/decrease number of results in the returned geo result array
- `radius: number`(default = 1000) - Search radius in meters

### eventOptions
```js
interface eventOptions {
    type?: eventTypes,
    month?: string,
    day?: string
}
```
The options for the onThisDay function on wiki object.

- `type : eventTypes`(default = all) - Accepts types of valid events on the wikipedia Rest API. Events can be one of `all`, `selected`, `births`, `deaths`, `events`, `holidays`.
- `month : string`(default = date.getMonth()) - Use this to pass the month you want as a string. By default, it will take current month.
- `day : string`(default = date.getDay()) - Use this to pass the day you want as a string. By default, it will take current day.

### fcOptions
```js
interface fcOptions {
    year?: string,
    month?: string,
    day?: string
}
```
The options for the featured content function on wiki object.

- `year : string`(default = date.getYear()) - Use this to pass the year you want as a string. By default, it will take current year.
- `month : string`(default = date.getMonth()) - Use this to pass the month you want as a string. By default, it will take current month.
- `day : string`(default = date.getDay()) - Use this to pass the day you want as a string. By default, it will take current day.

### pdfOptions
```js
interface pdfOptions {
    autoSuggest?: boolean
    format?: format
    type?: pdfType
}
```
The options for the onThisDay function on wiki object.

- `type : pdfType`(default = a4) - type can be one of `a4`, `letter`, `legal`.
- `format : format`(default = desktop) - format can be `desktop` or `mobile`.
- `autoSuggest : boolean`(default = false) - suggest a page title which is reccomened by wikipedia for given search string*

### autocompletionOptions
```js
interface autocompletionOptions {
    limit?: number
}
```
The options for the autocompletions function on wiki object.

- `limit : number`(default = 10) - Use this to increase/decrease number of results in the returned array

[1]: https://github.com/dopecodez/wikipedia/blob/master/docs/PAGE.md#functions