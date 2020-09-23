const wiki = require('../dist/index');

(async () => {
	const response = await wiki.page('Batman');
	console.log(response);
})().catch(error => {
	console.error(`\n${logSymbols.error} ${error.message}`);
	process.exit(1);
});