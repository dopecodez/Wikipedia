import { contentError, coordinatesError, htmlError, imageError, 
    infoboxError, introError, linksError, preloadError, relatedError, sectionsError, summaryError } from './errors';
import request, { makeRestRequest } from './request';
import { coordinatesResult, imageResult, langLinksResult, pageResult } from './resultTypes';
import { setPageId, setPageIdOrTitleParam } from './utils';
import infoboxParser from 'infobox-parser';
import { listOptions, pageOptions } from './optionTypes';

export class Page {
    pageid!: number;
    ns!: number;
    title!: string;
    contentmodel!: string;
    pagelanguage!: string;
    pagelanguagehtmlcode!: string;
    pagelanguagedir!: string;
    touched!: string;
    lastrevid!: number;
    length!: number;
    fullurl!: string;
    editurl!: string;
    canonicalurl!: string;
    revId!: number;
    parentId!: number;
    _summary!: JSON;
    _images!: Array<imageResult>;
    _content!: string;
    _html!: string;
    _categories!: Array<string>;
    _references!: Array<string>;
    _links!: Array<string>;
    _coordinates!: coordinatesResult;
    _langLinks!: Array<langLinksResult>;
    _info!: JSON;
    _tables!: Array<JSON>;
    _intro!: string;
    _related!: Array<JSON>;
    constructor(response: pageResult) {
        this.pageid = response.pageid;
        this.ns = response.ns;
        this.title = response.title;
        this.contentmodel = response.contentmodel;
        this.pagelanguage = response.pagelanguage;
        this.pagelanguagedir = response.pagelanguagedir;
        this.touched = response.touched;
        this.lastrevid = response.lastrevid;
        this.length = response.length;
        this.fullurl = response.fullurl;
        this.editurl = response.editurl;
        this.canonicalurl = response.canonicalurl;
    }

    public intro = async (pageOptions?: pageOptions): Promise<string> => {
        try {
            if (!this._intro) {
                const response = await intro(this.pageid.toString(), pageOptions?.redirect);
                this._intro = response;
            }
            return this._intro;
        } catch (error) {
            throw new introError(error);
        }
    }

    public images = async (listOptions?: listOptions): Promise<Array<imageResult>> => {
        try {
            if (!this._images) {
                const result = await images(this.pageid.toString(), listOptions);
                this._images = result;
            }
            return this._images;
        } catch (error) {
            throw new imageError(error);
        }
    }

    public summary = async (pageOptions?: pageOptions): Promise<JSON> => {
        try {
            if (!this._summary) {
                const result = await summary(this.title, pageOptions?.redirect);
                this._summary = result;
            }
            return this._summary;
        } catch (error) {
            throw new imageError(error);
        }
    }

    public html = async (pageOptions?: pageOptions): Promise<string> => {
        try {
            if (!this._html) {
                const result = await html(this.pageid.toString(), pageOptions?.redirect);
                this._html = result;
            }
            return this._html;
        } catch (error) {
            throw new htmlError(error);
        }
    }

    public content = async (pageOptions?: pageOptions): Promise<string> => {
        try {
            if (!this._content) {
                const result = await content(this.pageid.toString(), pageOptions?.redirect);
                this.parentId = result.ids.parentId;
                this.revId = result.ids.revId;
                this._content = result.result;
            }
            return this._content;
        } catch (error) {
            throw new contentError(error);
        }
    }

    public categories = async (listOptions?: listOptions): Promise<Array<string>> => {
        try {
            if (!this._categories) {
                const result = await categories(this.pageid.toString(), listOptions);
                this._categories = result;
            }
            return this._categories;
        } catch (error) {
            throw new sectionsError(error);
        }
    }

    public links = async (listOptions?: listOptions): Promise<Array<string>> => {
        try {
            if (!this._links) {
                const result = await links(this.pageid.toString(), listOptions);
                this._links = result;
            }
            return this._links;
        } catch (error) {
            throw new linksError(error);
        }
    }

    public references = async (listOptions?: listOptions): Promise<Array<string>> => {
        try {
            if (!this._references) {
                const result = await references(this.pageid.toString(), listOptions);
                this._references = result;
            }
            return this._references;
        } catch (error) {
            throw new linksError(error);
        }
    }

    public coordinates = async (pageOptions?: pageOptions): Promise<coordinatesResult> => {
        try {
            if (!this._coordinates) {
                const result = await coordinates(this.pageid.toString(), pageOptions?.redirect);
                this._coordinates = result;
            }
            return this._coordinates;
        } catch (error) {
            throw new coordinatesError(error);
        }
    }

    public langLinks = async (listOptions?: listOptions): Promise<Array<langLinksResult>> => {
        try {
            if (!this._langLinks) {
                const result = await langLinks(this.pageid.toString(), listOptions);
                this._langLinks = result;
            }
            return this._langLinks;
        } catch (error) {
            throw new linksError(error);
        }
    }

    public info = async (pageOptions?: pageOptions): Promise<JSON> => {
        try {
            if (!this._info) {
                const result = await info(this.pageid.toString(), pageOptions?.redirect);
                this._info = result;
            }
            return this._info;
        } catch (error) {
            throw new infoboxError(error);
        }
    }

    public tables = async (pageOptions?: pageOptions): Promise<Array<JSON>> => {
        try {
            if (!this._tables) {
                const result = await tables(this.pageid.toString(), pageOptions?.redirect);
                this._tables = result;
            }
            return this._tables;
        } catch (error) {
            throw new infoboxError(error);
        }
    }

    public related = async (pageOptions?: pageOptions): Promise<Array<JSON>> => {
        try {
            if (!this._related) {
                const result = await related(this.title, pageOptions?.redirect);
                this._related = result;
            }
            return this._related;
        } catch (error) {
            throw new relatedError(error);
        }
    }

    public async runMethod(functionName: string): Promise<any> {
        try {
            const result = await eval(`this.${functionName}()`);
            return result;
        } catch (error) {
            throw new preloadError(error);
        }
    }
}

export const images = async (title: string, listOptions?: listOptions): Promise<Array<imageResult>> => {
    try {
        let imageOptions: any = {
            generator: 'images',
            gimlimit: listOptions?.limit || 5,
            prop: 'imageinfo',
            iiprop: 'url'
        }
        imageOptions = setPageIdOrTitleParam(imageOptions, title);
        const response = await request(imageOptions, listOptions?.redirect);
        const images = [];
        const imageKeys = Object.keys(response.query.pages);
        for (const image of imageKeys) {
            const imageInfo = response.query.pages[image];
            imageInfo.url = imageInfo.imageinfo[0].url;
            images.push(imageInfo);
        }
        return images;
    } catch (error) {
        throw new imageError(error);
    }
}

export const intro = async (title: string, redirect = true): Promise<string> => {
    try {
        let introOptions: any = {
            prop: 'extracts',
            explaintext: '',
            exintro: '',
        }
        introOptions = setPageIdOrTitleParam(introOptions, title);
        const response = await request(introOptions, redirect);
        const pageId = setPageId(introOptions, response);
        return response.query.pages[pageId].extract;
    } catch (error) {
        throw new introError(error);
    }
}

export const html = async (title: string, redirect = true): Promise<string> => {
    try {
        let htmlOptions: any = {
            'prop': 'revisions',
            'rvprop': 'content',
            'rvlimit': 1,
            'rvparse': ''
        }
        htmlOptions = setPageIdOrTitleParam(htmlOptions, title);
        const response = await request(htmlOptions, redirect);
        const pageId = setPageId(htmlOptions, response);
        return response.query.pages[pageId].revisions[0]['*'];
    } catch (error) {
        throw new htmlError(error);
    }
}

export const content = async (title: string, redirect = true): Promise<any> => {
    try {
        let contentOptions: any = {
            'prop': 'extracts|revisions',
            'explaintext': '',
            'rvprop': 'ids'
        }
        contentOptions = setPageIdOrTitleParam(contentOptions, title);
        const response = await request(contentOptions, redirect);
        const pageId = setPageId(contentOptions, response);
        const result = response['query']['pages'][pageId]['extract'];
        const ids = {
            revisionId: response['query']['pages'][pageId]['revisions'][0]['revid'],
            parentId: response['query']['pages'][pageId]['revisions'][0]['parentid']
        }
        return {
            result,
            ids
        }
    } catch (error) {
        throw new contentError(error);
    }
}

export const categories = async (title: string, listOptions?: listOptions): Promise<Array<string>> => {
    try {
        let categoryOptions: any = {
            prop: 'categories',
            pllimit: listOptions?.limit,
        }
        categoryOptions = setPageIdOrTitleParam(categoryOptions, title);
        const response = await request(categoryOptions, listOptions?.redirect);
        const pageId = setPageId(categoryOptions, response);
        return response.query.pages[pageId].categories.map((category: any) => category.title)
    } catch (error) {
        throw new sectionsError(error);
    }
}

export const links = async (title: string, listOptions?: listOptions): Promise<Array<string>> => {
    try {
        let linksOptions: any = {
            prop: 'links',
            plnamespace: 0,
            pllimit: listOptions?.limit || 'max',
        }
        linksOptions = setPageIdOrTitleParam(linksOptions, title);
        const response = await request(linksOptions, listOptions?.redirect);
        const pageId = setPageId(linksOptions, response);
        let result = response.query.pages[pageId].links.map((link: any) => link.title)
        return result;
    } catch (error) {
        throw new linksError(error);
    }
}

export const references = async (title: string, listOptions?: listOptions): Promise<Array<string>> => {
    try {
        let extLinksOptions: any = {
            prop: 'extlinks',
            ellimit: listOptions?.limit || 'max',
        }
        extLinksOptions = setPageIdOrTitleParam(extLinksOptions, title);
        const response = await request(extLinksOptions, listOptions?.redirect);
        const pageId = setPageId(extLinksOptions, response);
        const result = response.query.pages[pageId].extlinks.map((link: any) => link['*'])
        return result;
    } catch (error) {
        throw new linksError(error);
    }
}

export const coordinates = async (title: string, redirect = true): Promise<coordinatesResult> => {
    try {
        let coordinatesOptions: any = {
            prop: 'coordinates',
        }
        coordinatesOptions = setPageIdOrTitleParam(coordinatesOptions, title);
        const response = await request(coordinatesOptions, redirect);
        const pageId = setPageId(coordinatesOptions, response);
        const coordinates = response.query.pages[pageId].coordinates;
        return coordinates ? coordinates[0] : null;
    } catch (error) {
        throw new coordinatesError(error);
    }
}

export const langLinks = async (title: string, listOptions?: listOptions): Promise<Array<langLinksResult>> => {
    try {
        let languageOptions: any = {
            prop: 'langlinks',
            lllimit: listOptions?.limit || 'max',
            llprop: 'url'
        }
        languageOptions = setPageIdOrTitleParam(languageOptions, title);
        const response = await request(languageOptions, listOptions?.redirect);
        const pageId = setPageId(languageOptions, response);
        const result = response.query.pages[pageId].langlinks.map((link: any) => {
            return {
                lang: link.lang,
                title: link['*'],
                url: link.url
            };
        })
        return result;
    } catch (error) {
        throw new linksError(error);
    }
}

export const info = async (title: string, redirect = true): Promise<JSON> => {
    try {
        let infoboxOptions: any = {
            prop: 'revisions',
            rvprop: 'content',
            rvsection: 0
        }
        const fullInfo = await rawInfo(title, infoboxOptions, redirect);
        let info = infoboxParser(fullInfo || '').general;
        if (Object.keys(info).length === 0) {
            // If empty, check to see if this page has a templated infobox
            const wikiText = await rawInfo(`Template:Infobox ${title.toLowerCase()}`, infoboxOptions);
            info = infoboxParser(wikiText || '').general;
        }
        return info;
    } catch (error) {
        throw new infoboxError(error);
    }
}

export const tables = async (title: string, redirect = true): Promise<Array<JSON>> => {
    try {
        let tableOptions: any = {
            prop: 'revisions',
            rvprop: 'content',
        }
        const fullInfo = await rawInfo(title, tableOptions, redirect);
        let info = infoboxParser(fullInfo || '').tables;
        if (Object.keys(info).length === 0) {
            // If empty, check to see if this page has a templated infobox
            const wikiText = await rawInfo(`Template:Infobox ${title.toLowerCase()}`, tableOptions);
            info = infoboxParser(wikiText || '').tables;
        }
        return info;
    } catch (error) {
        throw new infoboxError(error);
    }
}

export const rawInfo = async (title: string, options: any, redirect = true): Promise<any> => {
    try {
        options = setPageIdOrTitleParam(options, title);
        const response = await request(options, redirect);
        const pageId = setPageId(options, response);
        const data = response.query.pages[pageId]['revisions'][0];
        return data ? data['*'] : [];
    } catch (error) {
        throw new infoboxError(error);
    }
}

/* 
    REST-API Requests based on https://en.wikipedia.org/api/rest_v1/#/
    APIs seems to support only title parameters which is a drawback
*/

export const summary = async (title: string, redirect = true): Promise<JSON> => {
    try {
        const path = 'page/summary/' + title.replace(" ", "_");;
        const response = await makeRestRequest(path, redirect);
        return response;
    } catch (error) {
        throw new summaryError(error);
    }
}

/*
    Returns summaries for 20 pages related to the given page. Summaries include page title, namespace 
    and id along with short text description of the page and a thumbnail.
    @stability experimental

*/
export const related = async (title: string, redirect = true): Promise<Array<JSON>> => {
    try {
        const path = 'page/related/' + title.replace(" ", "_");
        const response = await makeRestRequest(path, redirect);
        return response;
    } catch (error) {
        throw new relatedError(error);
    }
}

export default Page;