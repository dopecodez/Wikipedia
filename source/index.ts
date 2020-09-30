import request from './request'
import { pageOptions, searchOptions } from './optionTypes';
import page from './page';
import { pageResult, wikiSearchResult } from './resultTypes';
import { imageError, pageError, searchError, summaryError } from './errors';
import { MSGS } from './messages';

const wiki = async() => {}

wiki.search = async (query: string, searchOptions?: searchOptions): Promise<wikiSearchResult> => {
    try {
        const searchParams: any = {
            'list': 'search',
            'srprop': '',
            'srlimit': searchOptions?.results || 10,
            'srsearch': query
        }
        searchOptions?.suggestion ? searchParams['srinfo'] = 'suggestion' : null;
        const response = await request(searchParams);
        const result: wikiSearchResult = {
            search: response.query.search,
            suggestion: response.query.searchinfo ? response.query.searchinfo.suggestion : null
        }
        return result;
    } catch (error) {
        throw new searchError(error);
    }
}

wiki.page = async (title: string, pageOptions?: pageOptions): Promise<pageResult> => {
    let searchResult: wikiSearchResult;
    try {
        if (pageOptions?.autoSuggest) {
            searchResult = await wiki.search(title, { results: 1, suggestion: true })
            if (!searchResult.suggestion && searchResult.search.length == 0) {
                throw new pageError(`${MSGS.PAGE_NOT_SUGGEST}${title}`)
            }
            title = searchResult.suggestion || title;
        }
        const pageParams: any = {
            prop: 'info|pageprops',
            inprop: 'url',
            ppprop: 'disambiguation',
            titles: title
        }
        const response = await request(pageParams);
        let pageInfo = response.query.pages;
        const pageId = Object.keys(pageInfo)[0];
        pageInfo = pageInfo[pageId];
        if (pageInfo.missing == '') {
            throw new pageError(`${MSGS.PAGE_NOT_EXIST}${title}`)
        }
        return pageInfo;
    } catch (error) {
        throw error;
    }
}

wiki.summary = async (title: string, pageOptions?: pageOptions) => {
    try {
        let response = await wiki.page(title, pageOptions);
        const summary = await page.summary(response.pageid.toString());
        return summary;
    } catch (error) {
        throw new summaryError(error);
    }
}

wiki.images = async (title: string, pageOptions?: pageOptions) => {
    try {
        let response = await wiki.page(title, pageOptions);
        const images = await page.images(response.pageid.toString());
        return images;
    } catch (error) {
        throw new imageError(error);
    }
}

export default wiki;
// For CommonJS default export support
module.exports = wiki;
module.exports.default = wiki;
