export interface wikiSearchResult {
    search : object[],
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