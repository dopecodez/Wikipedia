# WIKIPEDIA  [![Build Status](https://travis-ci.org/dopecodez/Wikipedia.svg?branch=master)](https://travis-ci.org/dopecodez/Wikipedia) [![Test Coverage](https://api.codeclimate.com/v1/badges/a44c826dbef8c7f5ea45/test_coverage)](https://codeclimate.com/github/dopecodez/Wikipedia/test_coverage)

Wikipedia for node.

Implements [legacy](https://www.mediawiki.org/wiki/API:Main_page) wiki endpoints and also the newer 
[REST API](https://en.wikipedia.org/api/rest_v1/#/).

Built with latest ES6 and native support for async/await and promises.

Built with TypeScript - exports all the types used.

# INSTALLATION

```
$ npm install wikipedia
```

## Highlights

- [Usage](#Usage)
- [Contributing](#contributing)

## Usage

```js
const wiki = require('wikipedia');

(async () => {
	try {
		const page = await wiki.page('Batman');
		console.log(response);
    //Response of type @Page object
    const summary = await page.summary();
    console.log(summary);
    //Response of type @wikiSummary
	} catch (error) {
		console.log(error);
		//=> Typeof wikiError
	}
})();
```

## Contributing

Before opening a pull request please make sure your changes follow the
[contribution guidelines][1].

[1]: https://github.com/dopecodez/wikipedia/blob/master/CONTRIBUTING.md
