const wiki = require('../dist/index');

(async () => {
	const page = await wiki.links('batman');
	console.log(page);
	// const result = await page.links();
	// console.log(result);
})().catch(error => {
	console.log(`${error.message}`);
	process.exit(1);
}); 
