export interface wikiSearchResult {
  results: any[],
  suggestion: string
}

export interface pageResult {
  pageid: number,
  ns: number,
  title: string,
  contentmodel: string,
  pagelanguage: string,
  pagelanguagehtmlcode: string,
  pagelanguagedir: string,
  touched: string,
  lastrevid: number,
  length: number,
  fullurl: string,
  editurl: string,
  canonicalurl: string
}

export interface imageResult {
  pageid: number,
  ns: number,
  title: string,
  imagerepository: string,
  imageinfo: any,
  url: string
}

export interface languageResult {
  [key: string]: string
}

export interface geoSearchResult {
  pageid: number,
  ns: number,
  title: string,
  lat: number,
  lon: number,
  dist: number,
  primary: string,
  type: string
}

export interface coordinatesResult {
  lat: number
  lon: number,
  primary: string,
  globe: string
}

export interface langLinksResult {
  lang: string,
  title: string,
  url: string
}

export interface wikiSummary {
  ns?: number,
  index?: number,
  type: string,
  title: string,
  displaytitle: string,
  namespace: { id: number, text: string },
  wikibase_item: string,
  titles: { canonical: string, normalized: string, display: string },
  pageid: number,
  thumbnail: {
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
  content_urls: {
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
  normalizedtitle?: string,
  coordinates?: {
    lat: number,
    lon: number
  }
}

export interface wikiMediaResult {
  revision: string,
  tid: string,
  items: Array<mediaResult>
}

export interface mediaResult {
  title: string,
  section_id: number,
  type: string,
  caption?: htmlText,
  showInGallery: boolean,
  srcset: Array<srcResult>
}

export interface srcResult {
  src: string,
  scale: string
}

export interface eventResult {
  births?: [
    {
      text: string,
      pages: Array<wikiSummary>
      year?: number
    }
  ],
  deaths?: [
    {
      text: string,
      pages: Array<wikiSummary>,
      year?: number
    }
  ],
  events?: [
    {
      text: string,
      pages: Array<wikiSummary>,
      year?: number
    }
  ],
  holidays?: [
    {
      text: string,
      pages: Array<wikiSummary>
    }
  ],
  selected?: [
    {
      text: string,
      pages: Array<wikiSummary>,
      year?: number
    }
  ]
}

export interface titleItem {
  title: string,
  page_id: number,
  rev: number,
  tid: number,
  namespace: number,
  user_id: number,
  user_text: string,
  timestamp: string,
  comment: string,
  tags: Array<string>,
  restrictions: Array<string>,
  page_language: string,
  redirect: boolean
}

export interface title {
  items: Array<titleItem>
}

export interface relatedResult {
  pages: Array<wikiSummary>
}

export interface mobileSections {
  lead: {
    ns: number,
    id: number,
    revision: string,
    lastmodified: string,
    lastmodifier: {
      user: string,
      gender: string
    },
    displaytitle: string,
    normalizedtitle: string,
    wikibase_item: string,
    description: string,
    description_source: string,
    protection: Record<string, unknown>,
    editable: boolean,
    languagecount: number,
    image: {
      file: string,
      urls: {
        320: string,
        640: string,
        800: string,
        1024: string
      }
    },
    issues: Array<htmlText>,
    geo?: {
      latitude: string,
      longitude: string
    }
    sections: Array<section>
  },
  remaining: {
    sections: Array<section>
  }
}

export interface section {
  id: number,
  text: string,
  toclevel: number,
  line: string,
  anchor: string
}

export interface htmlText {
  html: string,
  text: string
}