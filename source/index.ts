import request from './request'
import { pageOptions, searchOptions } from './types';
import page from './page';

const wiki = async() => {}

wiki.search = async (query: string, searchOptions: searchOptions) => {
    try {
        const searchParams: any = {
            'list': 'search',
            'srprop': '',
            'srlimit': searchOptions.results || 10,
            'srsearch': query
        }
        searchOptions.suggestion ? searchParams['srinfo'] = 'suggestion': null;
        const response = await request(searchParams);
        return response.query.search;
    }
    catch (error) {
        throw error;
    }
}

wiki.page = async (title: string, pageOptions: pageOptions) => {
    const pageParams: any = {
        prop: 'info|pageprops',
        inprop: 'url',
        ppprop: 'disambiguation',
        titles: title
    }
    console.log(pageOptions);
    const response = await request(pageParams);
    let pageInfo = response.query.pages;
    const pageId = Object.keys(pageInfo)[0];
    pageInfo = pageInfo[pageId];
    const summary = await page.summary(pageId);
    pageInfo.summary = summary;
    return pageInfo;
}

export default wiki;
// For CommonJS default export support
module.exports = wiki;
module.exports.default = wiki;
