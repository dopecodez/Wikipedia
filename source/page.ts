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

export default page;