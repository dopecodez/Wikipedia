import request, { setAPIUrl } from './request'
import { pageOptions, searchOptions, geoOptions } from './optionTypes';
import Page, {summary, images, html, content, categories} from './page';
import { wikiSearchResult } from './resultTypes';
import { contentError, htmlError, imageError, pageError, searchError, summaryError, wikiError } from './errors';
import { MSGS } from './messages';
import { isString, setTitleForPage } from './utils';

//The intial wiki function
//All APIs are based on https://www.mediawiki.org/wiki/API:Main_page
const wiki = async () => { }

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

wiki.page = async (title: string, pageOptions?: pageOptions): Promise<Page> => {
    try {
        if (pageOptions?.autoSuggest) {
            title = await setTitleForPage(title);
        }
        let pageParams: any = {
            prop: 'info|pageprops',
            inprop: 'url',
            ppprop: 'disambiguation',
        }
        if (isString(title)) {
            pageParams.titles = title
        } else {
            pageParams.pageids = title
        };
        const response = await request(pageParams);
        let pageInfo = response.query.pages;
        const pageId = Object.keys(pageInfo)[0];
        pageInfo = pageInfo[pageId];
        if (pageInfo.missing == '') {
            throw new pageError(`${MSGS.PAGE_NOT_EXIST}${title}`)
        }
        const page = new Page(pageInfo);
        return page;
    } catch (error) {
        throw error;
    }
}

wiki.summary = async (title: string, pageOptions?: pageOptions) : Promise<string> => {
    try {
        if (pageOptions?.autoSuggest) {
            title = await setTitleForPage(title);
        }
        const result = await summary(title);
        return result;
    } catch (error) {
        throw new summaryError(error);
    }
}

wiki.images = async (title: string, pageOptions?: pageOptions) : Promise<any> => {
    try {
        if (pageOptions?.autoSuggest) {
            title = await setTitleForPage(title);
        }
        const result = await images(title);
        return result;
    } catch (error) {
        throw new imageError(error);
    }
}

wiki.html = async (title: string, pageOptions?: pageOptions) : Promise<any> => {
    try {
        if (pageOptions?.autoSuggest) {
            title = await setTitleForPage(title);
        }
        const result = await html(title);
        return result;
    } catch (error) {
        throw new htmlError(error);
    }
}

wiki.content = async (title: string, pageOptions?: pageOptions) : Promise<any> => {
    try {
        if (pageOptions?.autoSuggest) {
            title = await setTitleForPage(title);
        }
        const response = await content(title);
        return response.result;
    } catch (error) {
        throw new contentError(error);
    }
}

wiki.categories = async (title: string, pageOptions?: pageOptions) : Promise<any> => {
    try {
        if (pageOptions?.autoSuggest) {
            title = await setTitleForPage(title);
        }
        const response = await categories(title);
        return response;
    } catch (error) {
        throw new contentError(error);
    }
}

wiki.languages = async () : Promise<any> => {
    try {
        const langParams = {
            'meta': 'siteinfo',
            'siprop': 'languages'
        }
        const response = await request(langParams);
        const languages = [];
        for (const lang of response.query.languages) {
            languages.push({ [lang.code]: lang['*'] })
        }
        return languages;
    } catch (error) {
        throw new wikiError(error);
    }
}

wiki.setLang = (language: string) : string => {
    try {
        const apiUrl = setAPIUrl(language);
        return apiUrl;
    } catch (error) {
        throw new wikiError(error);
    }
}

wiki.geoSearch = async (latitude: bigint, longitude: bigint, geoOptions?: geoOptions) : Promise<any> => {
    try {
        let geoSearchParams: any = {
            'list': 'geosearch',
            'gsradius': geoOptions?.radius || 1000,
            'gscoord': `${latitude}|${longitude}`,
            'gslimit': geoOptions?.results || 10,
            'gsprop': 'type'
        }
        const results = await request(geoSearchParams);
        const searchPages = results.query.geosearch;
        return searchPages;
    } catch (error) {
        throw new wikiError(error);
    }
}

wiki.suggest = async (query: string) : Promise<any> => {
    try{
        const suggestParams = {
            'list': 'search',
            'srinfo': 'suggestion',
            'srprop': '',
            'srsearch': query
        }
        let result = await request(suggestParams);
        return result.query?.searchinfo?.suggestion ? result.query?.searchinfo?.suggestion : null;
    } catch (error) {
        throw new searchError(error);
    }
}

export default wiki;
// For CommonJS default export support
module.exports = wiki;
module.exports.default = wiki;
