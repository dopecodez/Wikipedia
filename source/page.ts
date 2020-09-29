import request from './request';

const page = async() => {}

page.summary = async(pageId: string) => {
    const summaryOptions = {
        prop: 'extracts',
        explaintext: '',
        exintro: '',
        pageids: pageId
    }
    const response = await request(summaryOptions);
    return response.query.pages[pageId].extract;
}

page.images = async (pageId: string) => {
    const imageOptions = {
        generator: 'images',
        gimlimit: 5,
        prop: 'imageinfo',
        iiprop: 'url',
        pageids: pageId
    }
    const response = await request(imageOptions);
    const images = [];
    console.log(response.query.pages);
    const imageKeys = Object.keys(response.query.pages);
    for (const image of imageKeys) {
        const imageInfo = response.query.pages[image];
        imageInfo.url = imageInfo.imageinfo[0].url;
        images.push(imageInfo);
    }
    return images;
}

export default page;