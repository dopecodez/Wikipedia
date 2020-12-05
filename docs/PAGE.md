# Page

## Highlights

- [Class Members](#class-members)
- [Functions](#functions)
    - [summary()](#summary)
    - [intro()](#intro)
    - [images()](#images)
    - [html()](#html)
    - [related()](#related)
    - [media()](#media)
    - [content()](#content)
    - [categories()](#categories)
    - [links()](#links)
    - [coordinates()](#coordinates)
    - [references()](#references)
    - [langLinks()](#langLinks)

## Class Members

The `Page` class has the following properties:

```js
    pageid!: number; // id of page
    ns!: number;
    title!: string; // Title of page
    contentmodel!: string; 
    pagelanguage!: string; // The language of the page
    pagelanguagehtmlcode!: string;
    pagelanguagedir!: string;
    touched!: string;
    lastrevid!: number; //The last rev id of the page
    length!: number;
    fullurl!: string; // The full url of the page
    editurl!: string;
    canonicalurl!: string;
    revid!: number; // The revision id of the page
    parentid!: number; // The parent id of the page
    _summary!: wikiSummary; // Stores the summary in case it is preloaded or called on the page object earlier
    _images!: Array<imageResult>; // Stores the images in case it is preloaded or called on the page object earlier
    _content!: string; // Stores the content in case it is preloaded or called on the page object earlier
    _html!: string; // Stores the html in case it is preloaded or called on the page object earlier
    _categories!: Array<string>; // Stores the categories in case it is preloaded or called on the page object earlier
    _references!: Array<string>; // Stores the references in case it is preloaded or called on the page object earlier
    _links!: Array<string>; // Stores the links in case it is preloaded or called on the page object earlier
    _coordinates!: coordinatesResult; // Stores the coordinates in case it is preloaded or called on the page object earlier
    _langLinks!: Array<langLinksResult>; // Stores the langLinks in case it is preloaded or called on the page object earlier
    _infobox!: any; // Stores the infobox in case it is preloaded or called on the page object earlier
    _tables!: Array<any>; // Stores the tables in case it is preloaded or called on the page object earlier
    _intro!: string; // Stores the intro in case it is preloaded or called on the page object earlier
    _related!: Array<wikiSummary>; // Stores the related info in case it is preloaded or called on the page object earlier
```

## Functions

The page object has the following methods available on it : 

#### summary()

Returns the summary for the page as [wikiSummary][2] object. Summary contains the title, page Id, introduction, main image and content urls for the page.

```js
summary(pageOptions: pageOptions | undefined): Promise<wikiSummary>
```
- @param [pageOptions][1] - the options for the page
- @result[wikiSummary][2] - the summary object for the wiki page

```js
//example
const page = await wiki.page('Batman');
const summary = await page.summary({redirect: false});
```

#### intro()

Returns the introduction of the page as string

```js
intro(pageOptions: pageOptions | undefined): Promise<string>
```
- @param [pageOptions][1] - the options for the page

```js
//example
const page = await wiki.page('Batman');
const intro = await page.intro({redirect: false});
```

#### images()

Returns the images present in the page. 

**For a main image, use the summary endpoint**

```js
images(listOptions: listOptions | undefined): Promise<Array<imageResult>>
```
- @param [listOptions][3] - the options for the page
- @result [imageResult][4] - the image results for the page

```js
//example
const page = await wiki.page('Batman');
const images = await page.images({redirect: true, limit: 5});
```

#### html()

Returns the html content of the page as a string

```js
html = async (pageOptions?: pageOptions): Promise<string>
```
- @param [pageOptions][1] - the options for the page

```js
//example
const page = await wiki.page('Batman');
const html = await page.intro({redirect: false});
```

#### related()

Returns the related pages given for a a page.

```js
related = async (pageOptions?: pageOptions): Promise<Array<wikiSummary>>
```
- @param [pageOptions][1] - the options for the page
- @result[wikiSummary][2] - the summary object for the wiki page

```js
//example
const page = await wiki.page('Batman');
const related = await page.intro({redirect: false});
```

#### media()

Gets the list of media items present in the page

```js
media = async (pageOptions?: pageOptions): Promise<wikiMediaResult>
```
- @param [pageOptions][1] - the options for the page
- @result[wikiMediaResult][6] - the media result object for the wiki page

```js
//example
const page = await wiki.page('Batman');
const related = await page.intro({redirect: false});
```

#### content()

Returns the plain text content of a page.

```js
content = async (pageOptions?: pageOptions): Promise<string>
```
- @param [pageOptions][1] - the options for the page

```js
//example
const page = await wiki.page('Batman');
const content = await page.intro({redirect: false});
```

#### categories()

Returns the categories as an array of string

```js
categories = async (listOptions?: listOptions): Promise<Array<string>>
```
- @param [listOptions][3] - the options for the page

```js
//example
const page = await wiki.page('Batman');
const categories = await page.categories({redirect: false, , limit: 5});
```

#### links()

Returns the links present in the page

```js
links = async (listOptions?: listOptions): Promise<Array<string>>
```
- @param [listOptions][3] - the options for the page

```js
//example
const page = await wiki.page('Batman');
const links = await page.links({redirect: false, , limit: 5});
```

#### references()

Returns the references and external links in a page.

```js
references = async (listOptions?: listOptions): Promise<Array<string>>
```
- @param [listOptions][3] - the options for the page

```js
//example
const page = await wiki.page('Batman');
const references = await page.references({redirect: false, , limit: 5});
```

#### coordinates()

Returns the coordinates of a page

```js
coordinates = async (pageOptions?: pageOptions): Promise<coordinatesResult>
```
- @param [pageOptions][1] - the options for the page
- @result[coordinatesResult][5] - the coordinates result object for the wiki page

```js
//example
const page = await wiki.page('Batman');
const coordinates = await page.coordinates({redirect: false});
```

#### langLinks()

Returns the language links present in the page

```js
langLinks = async (listOptions?: listOptions): Promise<Array<langLinksResult>>
```
- @param [listOptions][3] - the options for the page
- @result[langLinksResult][6] - the langLinks result object

```js
//example
const page = await wiki.page('Batman');
const langLinks = await page.langLinks({redirect: false, , limit: 5});
```

#### infobox()

The infobox data(if present), as a JSON object.

```js
infobox = async (pageOptions?: pageOptions): Promise<any>
```
- @param [pageOptions][1] - the options for the page

```js
//example
const page = await wiki.page('Batman');
const info = await page.infobox({redirect: false});
```

#### tables()

The tables data in the page, if present as an array of json objects.
```js
tables = async (pageOptions?: pageOptions): Promise<Array<any>>
```
- @param [pageOptions][1] - the options for the page

```js
//example
const page = await wiki.page('Batman');
const tables = await page.tables({redirect: false});
```

[1]: https://github.com/dopecodez/wikipedia/blob/master/docs/optionTypes.md#pageOptions
[2]: https://github.com/dopecodez/wikipedia/blob/master/docs/resultTypes.md#wikiSummary
[3]: https://github.com/dopecodez/wikipedia/blob/master/docs/optionTypes.md#listOptions
[4]: https://github.com/dopecodez/wikipedia/blob/master/docs/resultTypes.md#imageResult
[5]: https://github.com/dopecodez/wikipedia/blob/master/docs/resultTypes.md#coordinatesResult
[5]: https://github.com/dopecodez/wikipedia/blob/master/docs/resultTypes.md#langLinksResult
[6]: https://github.com/dopecodez/wikipedia/blob/master/docs/resultTypes.md#wikiMediaResult
