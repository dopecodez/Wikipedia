const wiki = require('../dist/index');

(async () => {
	const result = await wiki.summary('batma', {autoSuggest: true});
	console.log(result);
	// console.log(result.pageid)
})().catch(error => {
	console.log(`${error.message}`);
	process.exit(1);
}); 
