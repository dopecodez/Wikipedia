const wiki = require('../dist/index');

(async () => {
	// const page = await wiki.geoSearch(8.530240, 76.929100);
	const page = await wiki.langLinks('Narendra Modi');
	console.log(page);
	// const result = await page.info();
	// console.log(result);
})().catch(error => {
	console.log(`${error.message}`);
	process.exit(1);
}); 
