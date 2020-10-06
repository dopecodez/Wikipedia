import request, { setAPIUrl } from './request'
import { pageOptions, searchOptions, geoOptions } from './optionTypes';
import Page, {summary, images} from './page';
import { wikiSearchResult } from './resultTypes';
import { imageError, pageError, searchError, summaryError, wikiError } from './errors';
import { MSGS } from './messages';
import { isString, setTitleForPage } from './utils';

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

wiki.summary = async (title: string, pageOptions?: pageOptions) => {
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

wiki.images = async (title: string, pageOptions?: pageOptions) => {
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

wiki.languages = async () => {
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

wiki.setLang = (language: string) => {
    try {
        const apiUrl = setAPIUrl(language);
        return apiUrl;
    } catch (error) {
        throw new wikiError(error);
    }
}

wiki.geoSearch = async (latitude: bigint, longitude: bigint, geoOptions?: geoOptions) => {
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

wiki.suggest = async (query: string) => {
    const suggestParams = {
        'list': 'search',
        'srinfo': 'suggestion',
        'srprop': '',
        'srsearch': query
    }
    let result = await request(suggestParams);
    return result.query?.searchinfo?.suggestion ? result.query?.searchinfo?.suggestion : null;
}

export default wiki;
// For CommonJS default export support
module.exports = wiki;
module.exports.default = wiki;