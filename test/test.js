const wiki = require('../dist/index');

(async () => {
	await wiki.search('Crusades');
})().catch(error => {
	console.error(`\n${logSymbols.error} ${error.message}`);
	process.exit(1);
});