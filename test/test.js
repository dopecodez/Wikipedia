const wiki = require('../dist/index');

(async () => {
	const page = await wiki.page('batman');
	console.log(page);
	const result = await page.content();
	console.log(result);
})().catch(error => {
	console.log(`${error.message}`);
	process.exit(1);
}); 
