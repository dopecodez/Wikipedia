const wiki = require('../dist/index');

(async () => {
	// const page = await wiki.geoSearch(8.530240, 76.929100);
	const page = await wiki.page('Batman');
	console.log(page);
	const result = await page.related();
	console.log(result);
})().catch(error => {
	console.log(`${error.message}`);
	process.exit(1);
}); 
