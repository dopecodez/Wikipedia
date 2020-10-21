import { contentError, htmlError, imageError, linksError, sectionsError, summaryError } from './errors';
import request from './request';
import { imageResult, pageResult } from './resultTypes';
import { setPageIdOrTitleParam } from './utils';

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
    revId!: number
    parentId!: number
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

    public summary = async (): Promise<string> => {
        try {
            const response = await summary(this.pageid.toString());
            return response;
        } catch (error) {
            throw new summaryError(error);
        }
    }

    public images = async (): Promise<Array<imageResult>> => {
        try {
            const result = await images(this.pageid.toString());
            return result;
        } catch (error) {
            throw new imageError(error);
        }
    }

    public html = async (): Promise<string> => {
        try {
            const result = await html(this.pageid.toString());
            return result;
        } catch (error) {
            throw new htmlError(error);
        }
    }

    public content = async (): Promise<string> => {
        try {
            const result = await content(this.pageid.toString());
            this.parentId = result.ids.parentId;
            this.revId = result.ids.revId;
            return result.result;
        } catch (error) {
            throw new contentError(error);
        }
    }

    public categories = async (): Promise<Array<string>> => {
        try {
            const result = await categories(this.pageid.toString());
            return result;
        } catch (error) {
            throw new sectionsError(error);
        }
    }

    public links = async (): Promise<Array<string>> => {
        try {
            const result = await links(this.pageid.toString());
            return result;
        } catch (error) {
            throw new linksError(error);
        }
    }

    public externalLinks = async (): Promise<Array<string>> => {
        try {
            const result = await externalLinks(this.pageid.toString());
            return result;
        } catch (error) {
            throw new linksError(error);
        }
    }
}

export const images = async (title: string): Promise<Array<imageResult>> => {
    try {
        let imageOptions: any = {
            generator: 'images',
            gimlimit: 5,
            prop: 'imageinfo',
            iiprop: 'url'
        }
        imageOptions = setPageIdOrTitleParam(imageOptions, title);
        const response = await request(imageOptions);
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

export const summary = async (title: string): Promise<string> => {
    try {
        let summaryOptions: any = {
            prop: 'extracts',
            explaintext: '',
            exintro: '',
        }
        summaryOptions = setPageIdOrTitleParam(summaryOptions, title);
        const response = await request(summaryOptions);
        if (summaryOptions.pageIds) {
            return response.query.pages[title].extract;
        } else {
            const pageId = Object.keys(response.query.pages)[0];
            return response.query.pages[pageId].extract;
        }
    } catch (error) {
        throw new summaryError(error);
    }
}

export const html = async (title: string): Promise<string> => {
    try {
        let htmlOptions: any = {
            'prop': 'revisions',
            'rvprop': 'content',
            'rvlimit': 1,
            'rvparse': ''
        }
        htmlOptions = setPageIdOrTitleParam(htmlOptions, title);
        const response = await request(htmlOptions);
        if (htmlOptions.pageIds) {
            return response.query.pages[title].revisions[0]['*'];
        } else {
            const pageId = Object.keys(response.query.pages)[0];
            return response.query.pages[pageId].revisions[0]['*'];
        }
    } catch (error) {
        throw new htmlError(error);
    }
}

export const content = async (title: string): Promise<any> => {
    try {
        let contentOptions: any = {
            'prop': 'extracts|revisions',
            'explaintext': '',
            'rvprop': 'ids'
        }
        contentOptions = setPageIdOrTitleParam(contentOptions, title);
        const response = await request(contentOptions);
        let pageId;
        if (contentOptions.pageIds) {
            pageId = title;
        } else {
            pageId = Object.keys(response.query.pages)[0];
        }
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

export const categories = async (title: string, limit = 100): Promise<Array<string>> => {
    try {
        let categoryOptions: any = {
            prop: 'categories',
            pllimit: limit,
        }
        categoryOptions = setPageIdOrTitleParam(categoryOptions, title);
        const response = await request(categoryOptions);
        let pageId;
        if (categoryOptions.pageIds) {
            pageId = title;
        } else {
            pageId = Object.keys(response.query.pages)[0];
        }
        return response.query.pages[pageId].categories.map((category: any) => category.title)
    } catch (error) {
        throw new sectionsError(error);
    }
}

export const links = async (title: string, limit = 100): Promise<Array<string>> => {
    try {
        let linksOptions: any = {
            prop: 'links',
            plnamespace: 0,
            pllimit: limit,
        }
        linksOptions = setPageIdOrTitleParam(linksOptions, title);
        const response = await request(linksOptions);
        let pageId;
        if (linksOptions.pageIds) {
            pageId = title;
        } else {
            pageId = Object.keys(response.query.pages)[0];
        }
        let result = response.query.pages[pageId].links.map((link: any) => link.title)
        return result;
    } catch (error) {
        throw new linksError(error);
    }
}

export const externalLinks = async (title: string): Promise<Array<string>> => {
    try {
        let extLinksOptions: any = {
            prop: 'extlinks',
            ellimit: 'max',
        }
        extLinksOptions = setPageIdOrTitleParam(extLinksOptions, title);
        const response = await request(extLinksOptions);
        let pageId;
        if (extLinksOptions.pageIds) {
            pageId = title;
        } else {
            pageId = Object.keys(response.query.pages)[0];
        }
        let result = response.query.pages[pageId].extlinks.map((link: any) => link['*'])
        return result;
    } catch (error) {
        throw new linksError(error);
    }
}

export default Page;