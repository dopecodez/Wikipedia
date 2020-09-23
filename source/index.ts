// import { options } from './types'
import request from './request'
import { pageOptions, searchOptions } from './types';

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
    return response.query.pages;
}

export default wiki;
// For CommonJS default export support
module.exports = wiki;
module.exports.default = wiki;
