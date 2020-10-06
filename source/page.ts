import { imageError, summaryError } from './errors';
import request from './request';
import { pageResult } from './resultTypes';
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

    public summary = async (): Promise<any> => {
        try {
            const response = await summary(this.pageid.toString());
            return response;
        } catch (error) {
            throw new summaryError(error);
        }
    }

    public images = async (): Promise<any> => {
        try {
            const result = await images(this.pageid.toString());
            return result;
        } catch (error) {
            throw new imageError(error);
        }
    }
}

export const images = async (title: string): Promise<any> => {
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

export const summary = async (title: string): Promise<any> => {
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

export default Page;