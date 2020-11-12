# Result Types

## Highlights

- [wikiSummary](#wikiSummary)
- [imageResult](#imageResult)
- [coordinatesResult](#coordinatesResult)
- [langLinksResult](#langLinksResult)

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