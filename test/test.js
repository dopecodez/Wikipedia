const wiki = require('../dist/index');

(async () => {
	const result = await wiki.search('clémentine');
	console.log(result);
})().catch(error => {
	console.log(`${error.message}`);
	process.exit(1);
}); 
