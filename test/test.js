const wiki = require('../dist/index');

(async () => {
	const response = await wiki.summary(4335);
	console.log(response);
})().catch(error => {
	console.log(`${error.message}`);
	process.exit(1);
}); 
