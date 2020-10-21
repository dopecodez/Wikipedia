import wiki from ".";
import { pageError } from "./errors";
import { MSGS } from "./messages";

export function isString(title: any){
    return isNaN(title);
}

export async function setTitleForPage(title: string) {
    {
        const searchResult = await wiki.search(title, { results: 1, suggestion: true })
        if (!searchResult.suggestion && searchResult.search.length == 0) {
            throw new pageError(`${MSGS.PAGE_NOT_SUGGEST}${title}`)
        }
        title = searchResult.suggestion || title;
        return title;
    }
}

export function setPageIdOrTitleParam(params: any, title: string) {
    if (isString(title)) {
        params.titles = title
    } else {
        params.pageids = title
    };
    return params;
}

export function setPageId(params: any, results: any): number {
    let pageId;
    if (params.pageIds) {
        pageId = params.pageIds;
    } else {
        pageId = Object.keys(results.query.pages)[0];
    }
    return pageId;
}