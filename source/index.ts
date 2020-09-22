// import { options } from './types'
import request from './request'

const wiki = async() => {}

wiki.search = async (query: string, results = 10, suggestion = false) => {
    try {
        const searchParams: any = {
            'list': 'search',
            'srprop': '',
            'srlimit': results,
            'srsearch': query
        }
        suggestion ? searchParams['srinfo'] = 'suggestion': null;
        const response = await request(searchParams);
        console.log(response.toString());
    }
    catch (error) {
        throw error;
    }
}

export default wiki;
// For CommonJS default export support
module.exports = wiki;
module.exports.default = wiki;
