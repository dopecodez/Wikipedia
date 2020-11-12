# Input Options

## Highlights

- [pageOptions](#pageOptions)
- [listOptions](#listOptions)

### pageOptions

```js
interface pageOptions {
    autoSuggest?: boolean
    redirect?: boolean
    preload?: boolean
    fields?: Array<pageFunctions>
}
```
The options for page methods on `Page` or `wiki`. Generally, can be used for all page methods which do not return a array.

- `autoSuggest : boolean`(default = false) - suggest a page title which is reccomened by wikipedia for given search string*
- `redirect : boolean`(default = true) - redirect in case wikipedia returns a 304

The other two fields are only applicable if added on the `wiki.page('title')` method, otherwise its ignored.

- `preload : boolean`(default = false) - When used with fields, it can preload any fields for the page(Loads summary by default if used without `fields` argument).
- `fields : string[]` - Accepts a array of string which should a combination the functions available on page(Accepted values are combinations of: 'summary','images','intro','html,'content','categories','links','references','coordinates','langLinks','infobox','tables','related').

### listOptions

```js
interface listOptions {
    autoSuggest?: boolean
    redirect?: boolean
    limit?: number
}
```
The options for page methods on `Page` or `wiki`. Generally, can be used for all page methods which return an array

- `autoSuggest : boolean`(default = false) - suggest a page title which is reccomened by wikipedia for given search string*
- `redirect : boolean`(default = true) - redirect in case wikipedia returns a 304
- `limit : number`(default = 10) - Use this to increase/decrease number of results in the returned array
