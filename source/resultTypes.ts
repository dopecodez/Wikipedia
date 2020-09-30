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