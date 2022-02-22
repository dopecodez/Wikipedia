import wiki from ".";
import { pageError } from "./errors";
import { MSGS } from "./messages";

//check if input is string
export function isString(title: any){
    return isNaN(title);
}

//set title for page in case autoSuggest is true
export async function setTitleForPage(title: string) {
    {
        const searchResult = await wiki.search(title, { limit: 1, suggestion: true })
        if (!searchResult.suggestion && searchResult.results.length == 0) {
            throw new pageError(`${MSGS.PAGE_NOT_SUGGEST}${title}`)
        }
        title = searchResult.suggestion || title;
        return title;
    }
}

//Set page id or title param for legacy api queries
export function setPageIdOrTitleParam(params: any, title: string) {
    if (isString(title)) {
        params.titles = title
    } else {
        params.pageids = title
    }
    return params;
}

//Get page id from params or from results
export function setPageId(params: any, results: any): number {
    let pageId;
    if (params.pageIds) {
        pageId = params.pageIds;
    } else {
        pageId = Object.keys(results.query.pages)[0];
    }
    return pageId;
}

//Get current year
export function getCurrentYear(): number {
    const date = new Date();
    const year = date.getFullYear();
    return (year);
}

//Get current month
export function getCurrentMonth(): number {
    const date = new Date();
    const month = date.getMonth();
    return (month + 1); //javascript months are indexed at zero for some reason
}

//Get current day
export function getCurrentDay(): number {
    const date = new Date();
    const day = date.getDate();
    return day;
}