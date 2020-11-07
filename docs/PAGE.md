# Page

## Highlights

- [Class Members](#class-members)
<details>
    <summary>[Functions](#functions)<summary>

        - [summary()](#summary())
</details>

- [Misc](#miscellanious)

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

Returns the summary for the page.

```js
summary(pageOptions: [pageOptions][1] | undefined): Promise<wikiSummary>
```
- @param [pageOptions][1] - the options for the page

[1]: https://github.com/dopecodez/wikipedia/blob/master/docs/optionTypes.md#pageOptions
