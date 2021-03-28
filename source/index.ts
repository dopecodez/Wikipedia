import request, { makeRestRequest, setAPIUrl } from './request'
import { pageOptions, searchOptions, geoOptions, listOptions, eventOptions, randomFormats } from './optionTypes';
import Page, {
    intro, images, html, content, categories, links, coordinates, langLinks,
    references, infobox, tables, summary, related, media
} from './page';
import { coordinatesResult, eventResult, geoSearchResult, imageResult, langLinksResult, languageResult, 
    mobileSections, relatedResult, 
    title, wikiMediaResult, wikiSearchResult, wikiSummary } from './resultTypes';
import {
    categoriesError,
    contentError, coordinatesError, eventsError, geoSearchError, htmlError, imageError, infoboxError,
    introError, linksError, mediaError, pageError, relatedError, searchError, summaryError, wikiError
} from './errors';
import { MSGS } from './messages';
import { getCurrentDay, getCurrentMonth, setPageId, setPageIdOrTitleParam, setTitleForPage } from './utils';

/**
 * The default wiki export
 *
 * @remarks
 * Internally calls wiki.page
 *
 */
const wiki = async (title: string, pageOptions?: pageOptions): Promise<Page> => {
    return wiki.page(title, pageOptions);
}

/**
 * Returns the search results for a given query
 *
 * @remarks
 * Limits results by default to 10
 *
 * @param query - The string to search for
 * @param searchOptions - The number of results and if suggestion needed {@link searchOptions | searchOptions }
 * @returns an array of {@link wikiSearchResult | wikiSearchResult }
 */
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
            results: response.query.search,
            suggestion: response.query.searchinfo ? response.query.searchinfo.suggestion : null
        }
        return result;
    } catch (error) {
        throw new searchError(error);
    }
}

/**
 * Returns the page for a given title or string
 * 
 * @remarks
 * Call this method to get the basic info for page and also to preload any params you might use in future
 *
 * @param title - The title or page Id of the page
 * @param pageOptions - Whether to redirect, autoSuggest or preload any fields {@link pageOptions | pageOptions }
 * @returns The intro string
 */
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
        throw new pageError(error);
    }
}

/**
 * Returns the intro present in a wiki page
 *
 * @remarks
 * Called in page object and also through wiki default object
 *
 * @param title - The title or page Id of the page
 * @param pageOptions - Whether to redirect in case of 302
 * @returns The intro string
 */
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

/**
 * Returns the images present in a wiki page
 *
 * @remarks
 * Called in page object and also through wiki default object
 *
 * @param title - The title or page Id of the page
 * @param listOptions - {@link listOptions | listOptions }
 * @returns an array of imageResult {@link imageResult | imageResult }
 */
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

/**
 * Returns the summary of the page
 *
 * @remarks
 * Called in page object and also through wiki default object
 *
 * @param title - The title or page Id of the page
 * @param pageOptions - Whether to redirect in case of 302
 * @returns The summary of the page as {@link wikiSummary | wikiSummary}
 */
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

/**
 * Returns the html content of a page
 *
 * @remarks
 * Called in page object and also through wiki default object
 *
 * @param title - The title or page Id of the page
 * @param pageOptions - Whether to redirect in case of 302
 * @returns The html content as string
 * 
 * @beta
 */
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

/**
 * Returns the plain text content of a page
 *
 * @remarks
 * Called in page object and also through wiki default object
 *
 * @param title - The title or page Id of the page
 * @param pageOptions - Whether to redirect in case of 302
 * @returns The plain text as string and the parent and revision ids
 */
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

/**
 * Returns the cetegories present in page
 *
 * @remarks
 * Called in page object and also through wiki default object
 *
 * @param title - The title or page Id of the page
 * @param listOptions - {@link listOptions | listOptions }
 * @returns The categories as an array of string
 */
wiki.categories = async (title: string, listOptions?: listOptions): Promise<Array<string>> => {
    try {
        if (listOptions?.autoSuggest) {
            title = await setTitleForPage(title);
        }
        const response = await categories(title, listOptions);
        return response;
    } catch (error) {
        throw new categoriesError(error);
    }
}

/**
 * Returns summaries for 20 pages related to the given page. Summaries include page title, namespace 
 * and id along with short text description of the page and a thumbnail.
 *
 * @remarks
 * Called in page object and also through index
 *
 * @param title - The title or page Id of the page
 * @param pageOptions - Whether to redirect in case of 302
 * @returns The related pages and summary as an array of {@link wikiSummary | wikiSummary}
 * 
 * @experimental
 */
wiki.related = async (title: string, pageOptions?: pageOptions): Promise<relatedResult> => {
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

/**
 * Gets the list of media items (images, audio, and video) in the
 * order in which they appear on a given wiki page.
 *
 * @remarks
 * Called in page object and also through index
 *
 * @param title - The title or page Id of the page
 * @param redirect - Whether to redirect in case of 302
 * @returns The related pages and summary as an array of {@link wikiMediaResult | wikiMediaResult}
 *
 * @experimental
 */
wiki.media = async (title: string, pageOptions?: pageOptions): Promise<wikiMediaResult> => {
    try {
        if (pageOptions?.autoSuggest) {
            title = await setTitleForPage(title);
        }
        const response = await media(title, pageOptions?.redirect);
        return response;
    } catch (error) {
        throw new mediaError(error);
    }
}

/**
 * Returns the links present in page
 *
 * @remarks
 * Called in page object and also through wiki default object
 *
 * @param title - The title or page Id of the page
 * @param listOptions - {@link listOptions | listOptions }
 * @returns The links as an array of string
 */
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

/**
 * Returns the references of external links present in page
 *
 * @remarks
 * Called in page object and also through wiki default object
 *
 * @param title - The title or page Id of the page
 * @param listOptions - {@link listOptions | listOptions }
 * @returns The references as an array of string
 */
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

/**
 * Returns the coordinates of a page
 *
 * @remarks
 * Called in page object and also through wiki default object
 *
 * @param title - The title or page Id of the page
 * @param pageOptions - Whether to redirect in case of 302
 * @returns The coordinates as {@link coordinatesResult | coordinatesResult}
 */
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

/**
 * Returns the language links present in the page
 *
 * @remarks
 * Called in page object and also through wiki default object
 *
 * @param title - The title or page Id of the page
 * @param listOptions - {@link listOptions | listOptions }
 * @returns The links as an array of {@link langLinksResult | langLinksResult }
 */
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

/**
 * Returns the infobox content of page if present
 *
 * @remarks
 * Called in page object and also through wiki default object
 *
 * @param title - The title or page Id of the page
 * @param pageOptions - Whether to redirect in case of 302
 * @returns The info as JSON object
 */
wiki.infobox = async (title: string, pageOptions?: pageOptions): Promise<any> => {
    try {
        if (pageOptions?.autoSuggest) {
            title = await setTitleForPage(title);
        }
        const response = await infobox(title, pageOptions?.redirect);
        return response;
    } catch (error) {
        throw new infoboxError(error);
    }
}

/**
 * Returns the table content of page if present
 *
 * @remarks
 * Called in page object and also through wiki default object
 *
 * @param title - The title or page Id of the page
 * @param pageOptions - Whether to redirect in case of 302
 * @returns The tables as arrays of JSON objects
 */
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

/**
 * Returns the languages available in wiki
 *
 * @remarks
 * Use this if you want to check if a lanuage exists before actually setting it
 *
 * @returns The languages an array of {@link languageResult | languageResult}
 */
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

/**
 * sets the languages to given string - verify your input using languages method
 *
 * @remarks
 * Use this to set your language for future api calls
 *
 * @returns The new api endpoint as string
 */
wiki.setLang = (language: string): string => {
    const apiUrl = setAPIUrl(language);
    return apiUrl;
}

/**
 * Returns the pages with coordinates near the geo search coordinates 
 *
 * @remarks
 * Latitude and longitude should be valid values
 *
 * @param latitude - The latitude to search
 * @param longitude - The longitude to search
 * @param geoOptions - The number of results and the search radius {@link geoOptions | geoOptions}
 * @returns The results as an array of {@link geoSearchResult | geoSearchResult}
 */
wiki.geoSearch = async (latitude: number, longitude: number, geoOptions?: geoOptions): Promise<Array<geoSearchResult>> => {
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

/**
 * Returns the suggestion for a given query
 *
 * @remarks
 * Use this if you want your user to approve the suggestion before using it
 *
 * @param query - The string to query
 * @returns Returns a string or null based on if suggestion is present or not
 */
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

/**
 * Returns the events for a given day
 *
 * @remarks
 * The api returns the events that happened on a particular month and day
 *
 * @param eventOptions - the event types, and the month and day {@link eventOptions | eventOptions}
 * @returns Returns the results as array of {@link eventResult | eventResult}
 */
wiki.onThisDay = async (eventOptions: eventOptions = {}): Promise<eventResult> => {
    try {
        const type = eventOptions.type || 'all';
        const mm = (eventOptions.month || getCurrentMonth()).toString().padStart(2, "0")
        const dd = (eventOptions.day || getCurrentDay()).toString().padStart(2, "0")
        const path = `feed/onthisday/${type}/${mm}/${dd}`;
        const result = await makeRestRequest(path, true);
        return result;
    } catch (error) {
        throw new eventsError(error);
    }
}

/**
 * Returns a random page
 *
 * @param format - The desired return format
 * @returns Returns content from a random page
 */
wiki.random = async (format?: randomFormats): Promise<wikiSummary | title | relatedResult | mobileSections | string> => {
    try {
        if(!format){
            format = 'summary';
        }
        const path = `page/random/${format}`;
        const result = await makeRestRequest(path);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export default wiki;
// For CommonJS default export support
module.exports = wiki;
module.exports.default = wiki;
