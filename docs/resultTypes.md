# Result Types

## Highlights

- [wikiSummary](#wikiSummary)
- [imageResult](#imageResult)
- [coordinatesResult](#coordinatesResult)
- [langLinksResult](#langLinksResult)
- [wikiSearchResult](#wikiSearchResult)
- [geoSearchResult](#geoSearchResult)
- [languageResult](#languageResult)

### wikiSummary

The wiki summary for the page.

```js
interface wikiSummary {
  type: string,
  title: string, // title of the page
  displaytitle: string, // title of the page
  namespace: { id: number, text: string },
  wikibase_item: string,
  titles: { canonical: string, normalized: string, display: string },
  pageid: number, // page Id
  thumbnail: { // Thumbnail for the page
    source: string,
    width: number,
    height: number
  },
  originalimage: {
    source: string,
    width: number,
    height: number
  },
  lang: string,
  dir: string,
  revision: string,
  tid: string,
  timestamp: string,
  description: string,
  description_source: string,
  content_urls: { // The urls will be here
    desktop: {
      page: string,
      revisions: string,
      edit: string,
      talk: string
    },
    mobile: {
      page: string,
      revisions: string,
      edit: string,
      talk: string
    }
  },
  extract: string
  extract_html: string
}
```

### imageResult

The image result for the page.

```js
interface imageResult {
  pageid: number,
  ns: number,
  title: string,
  imagerepository: string,
  imageinfo: any,
  url: string // This will contain the image url
}
```

### coordinatesResult

The coordinates result.
```js
interface coordinatesResult {
  lat: number //latitude
  lon: number, //longitude
  primary: string,
  globe: string // The globe ie Earth!
}
```

### langLinksResult

The lang links result

```js
interface langLinksResult {
  lang: string, //language code
  title: string, // The title of the page
  url: string // url of the page
}
```

### wikiSearchResult

The search result. The autosuggest will be populated or null based on input params.

```js
interface wikiSearchResult {
  results: any[], // the search results as an array
  suggestion: string // the suggestion string if suggestion option is set to true
}
```
### geoSearchResult

The geosearch result.

```js
interface geoSearchResult {
  pageid: number, // the page id. use this or title for further requests
  ns: number,
  title: string, // the title. use this or pageid for further requests
  lat: number, // the page latitude
  lon: number, // the page longitude
  dist: number,
  primary: string,
  type: string // the type of the page eg: city, museum
}
```
### languageResult

```js
interface languageResult {
  [key: string]: string // key will be the language code to be used in setLang(key), and the value will be the full url
}
```

