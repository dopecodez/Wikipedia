const wiki = require('../dist/index');

(async () => {
	const response = await wiki.images('Batman');
	console.log(response);
})().catch(error => {
	console.log(`${error.message}`);
	process.exit(1);
});