import request from './request';
import { pageResult } from './resultTypes';

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

    public summary = async (): Promise<string> => {
        const summaryOptions = {
            prop: 'extracts',
            explaintext: '',
            exintro: '',
            pageids: this.pageid
        }
        const response = await request(summaryOptions);
        return response.query.pages[this.pageid].extract;
    }

    public images = async (): Promise<any> => {
        const imageOptions = {
            generator: 'images',
            gimlimit: 5,
            prop: 'imageinfo',
            iiprop: 'url',
            pageids: this.pageid
        }
        const response = await request(imageOptions);
        const images = [];
        const imageKeys = Object.keys(response.query.pages);
        for (const image of imageKeys) {
            const imageInfo = response.query.pages[image];
            imageInfo.url = imageInfo.imageinfo[0].url;
            images.push(imageInfo);
        }
        return images;
    }
}

export default Page;