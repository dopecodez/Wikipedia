const wiki = require('../dist/index');

(async () => {
	const result = await wiki.geoSearch(8.525827777777776, 76.936975);
	console.log(result);
})().catch(error => {
	console.log(`${error.message}`);
	process.exit(1);
}); 
