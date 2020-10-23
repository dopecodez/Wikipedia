import request, { setAPIUrl } from './request'
import { pageOptions, searchOptions, geoOptions, listOptions } from './optionTypes';
import Page, {
    intro, images, html, content, categories, links, coordinates, langLinks,
    references, info, tables, summary, related
} from './page';
import { coordinatesResult, geoSearchResult, imageResult, langLinksResult, languageResult, 
    wikiSearchResult, wikiSummary } from './resultTypes';
import {
    contentError, coordinatesError, geoSearchError, htmlError, imageError, infoboxError,
    introError, linksError, pageError, relatedError, searchError, summaryError, wikiError
} from './errors';
import { MSGS } from './messages';
import { setPageId, setPageIdOrTitleParam, setTitleForPage } from './utils';

//The intial wiki function
//All APIs are based on https://www.mediawiki.org/wiki/API:Main_page
const wiki = async (title: string, pageOptions?: pageOptions) => {
    wiki.page(title, pageOptions);
 }

wiki.search = async (query: string, searchOptions?: searchOptions): Promise<wikiSearchResult> => {
    try {
        const searchParams: any = {
            'list': 'search',
            'srprop': '',
            'srlimit': searchOptions?.limit || 10,
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
        pageParams = setPageIdOrTitleParam(pageParams, title);
        const response = await request(pageParams);
        let pageInfo = response.query.pages;
        const pageId = setPageId(pageParams, response);
        pageInfo = pageInfo[pageId];
        if (pageInfo.missing == '') {
            throw new pageError(`${MSGS.PAGE_NOT_EXIST}${title}`)
        }
        const page = new Page(pageInfo);
        if (pageOptions?.preload) {
            if (!pageOptions?.fields) {
                pageOptions.fields = ['summary', 'images'];
            }
            for (const field of pageOptions.fields) {
                await page.runMethod(field);
            }
        }
        return page;
    } catch (error) {
        throw error;
    }
}

wiki.intro = async (title: string, pageOptions?: pageOptions): Promise<string> => {
    try {
        if (pageOptions?.autoSuggest) {
            title = await setTitleForPage(title);
        }
        const result = await intro(title, pageOptions?.redirect);
        return result;
    } catch (error) {
        throw new introError(error);
    }
}

wiki.images = async (title: string, listOptions?: listOptions): Promise<Array<imageResult>> => {
    try {
        if (listOptions?.autoSuggest) {
            title = await setTitleForPage(title);
        }
        const result = await images(title, listOptions);
        return result;
    } catch (error) {
        throw new imageError(error);
    }
}

wiki.summary = async (title: string, pageOptions?: pageOptions): Promise<wikiSummary> => {
    try {
        if (pageOptions?.autoSuggest) {
            title = await setTitleForPage(title);
        }
        const result = await summary(title, pageOptions?.redirect);
        return result;
    } catch (error) {
        throw new summaryError(error);
    }
}

wiki.html = async (title: string, pageOptions?: pageOptions): Promise<string> => {
    try {
        if (pageOptions?.autoSuggest) {
            title = await setTitleForPage(title);
        }
        const result = await html(title, pageOptions?.redirect);
        return result;
    } catch (error) {
        throw new htmlError(error);
    }
}

wiki.content = async (title: string, pageOptions?: pageOptions): Promise<string> => {
    try {
        if (pageOptions?.autoSuggest) {
            title = await setTitleForPage(title);
        }
        const response = await content(title, pageOptions?.redirect);
        return response.result;
    } catch (error) {
        throw new contentError(error);
    }
}

wiki.categories = async (title: string, listOptions?: listOptions): Promise<Array<string>> => {
    try {
        if (listOptions?.autoSuggest) {
            title = await setTitleForPage(title);
        }
        const response = await categories(title, listOptions);
        return response;
    } catch (error) {
        throw new contentError(error);
    }
}

wiki.related = async (title: string, pageOptions?: pageOptions): Promise<Array<wikiSummary>> => {
    try {
        if (pageOptions?.autoSuggest) {
            title = await setTitleForPage(title);
        }
        const response = await related(title, pageOptions?.redirect);
        return response;
    } catch (error) {
        throw new relatedError(error);
    }
}

wiki.links = async (title: string, listOptions?: listOptions): Promise<Array<string>> => {
    try {
        if (listOptions?.autoSuggest) {
            title = await setTitleForPage(title);
        }
        const response = await links(title, listOptions);
        return response;
    } catch (error) {
        throw new linksError(error);
    }
}

wiki.references = async (title: string, listOptions?: listOptions): Promise<Array<string>> => {
    try {
        if (listOptions?.autoSuggest) {
            title = await setTitleForPage(title);
        }
        const response = await references(title, listOptions);
        return response;
    } catch (error) {
        throw new linksError(error);
    }
}

wiki.coordinates = async (title: string, pageOptions?: pageOptions): Promise<coordinatesResult | null> => {
    try {
        if (pageOptions?.autoSuggest) {
            title = await setTitleForPage(title);
        }
        const response = await coordinates(title, pageOptions?.redirect);
        return response;
    } catch (error) {
        throw new coordinatesError(error);
    }
}

wiki.langLinks = async (title: string, listOptions?: listOptions): Promise<Array<langLinksResult>> => {
    try {
        if (listOptions?.autoSuggest) {
            title = await setTitleForPage(title);
        }
        const response = await langLinks(title, listOptions);
        return response;
    } catch (error) {
        throw new linksError(error);
    }
}

wiki.infobox = async (title: string, pageOptions?: pageOptions): Promise<any> => {
    try {
        if (pageOptions?.autoSuggest) {
            title = await setTitleForPage(title);
        }
        const response = await info(title, pageOptions?.redirect);
        return response;
    } catch (error) {
        throw new infoboxError(error);
    }
}

wiki.tables = async (title: string, pageOptions?: pageOptions): Promise<Array<any>> => {
    try {
        if (pageOptions?.autoSuggest) {
            title = await setTitleForPage(title);
        }
        const response = await tables(title, pageOptions?.redirect);
        return response;
    } catch (error) {
        throw new infoboxError(error);
    }
}

wiki.languages = async (): Promise<Array<languageResult>> => {
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

wiki.setLang = (language: string): string => {
    try {
        const apiUrl = setAPIUrl(language);
        return apiUrl;
    } catch (error) {
        throw new wikiError(error);
    }
}

wiki.geoSearch = async (latitude: bigint, longitude: bigint, geoOptions?: geoOptions): Promise<Array<geoSearchResult>> => {
    try {
        const geoSearchParams: any = {
            'list': 'geosearch',
            'gsradius': geoOptions?.radius || 1000,
            'gscoord': `${latitude}|${longitude}`,
            'gslimit': geoOptions?.limit || 10,
            'gsprop': 'type'
        }
        const results = await request(geoSearchParams);
        const searchPages = results.query.geosearch;
        return searchPages;
    } catch (error) {
        throw new geoSearchError(error);
    }
}

wiki.suggest = async (query: string): Promise<string | null> => {
    try {
        const suggestParams = {
            'list': 'search',
            'srinfo': 'suggestion',
            'srprop': '',
            'srsearch': query
        }
        const result = await request(suggestParams);
        return result.query?.searchinfo?.suggestion ? result.query?.searchinfo?.suggestion : null;
    } catch (error) {
        throw new searchError(error);
    }
}

export default wiki;
// For CommonJS default export support
module.exports = wiki;
module.exports.default = wiki;
