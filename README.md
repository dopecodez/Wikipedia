# WIKIPEDIA  [![Build Status](https://travis-ci.org/dopecodez/Wikipedia.svg?branch=master)](https://travis-ci.org/dopecodez/Wikipedia) [![Test Coverage](https://api.codeclimate.com/v1/badges/a44c826dbef8c7f5ea45/test_coverage)](https://codeclimate.com/github/dopecodez/Wikipedia/test_coverage)

Wikipedia for node.

Implements [legacy](https://www.mediawiki.org/wiki/API:Main_page) wiki endpoints and also the newer 
[REST API](https://en.wikipedia.org/api/rest_v1/#/).

Try out the new `summary()` REST endpoint for a introduction to your page and the main images optimized for browsers and mobile!

Built with latest ES6 and native support for async/await and promises.

Built with TypeScript - exports all the types used.

# INSTALLATION

```
$ npm install wikipedia
```

## Highlights

- [What can it do](#what-can-it-do)
- [Usage](#Usage)
- [Options](#Options)
- [Contributing](#contributing)

## What can it do?

- Get a summary for an page which contains the intro and main image optimized for web and mobile with the new wikipedia [REST APIs](https://en.wikipedia.org/api/rest_v1/#/)
- Get article information 
- Fetch article content
- Find all links/images/categories in a page
- Find related articles given a article
- Find articles by geographical location
- Supports switching languages
- Parses infoboxes using [infobox-parser](https://github.com/dijs/infobox-parser)

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
		//Response of type @wikiSummary - contains the intro and the main image
	} catch (error) {
		console.log(error);
		//=> Typeof wikiError
	}
})();
```
The page method returns a [Page][2] class object which has fields like `pageid`, `title`, `parentid`, `revisionid` and methods like `summary()`, `intro()`, `images()`, `html()` and more.

All the page methods can take a title parameter or a pageId. Read up on the [Page documentation][2] here to see a detailed overview of the methods available in page.

You can also call methods like `summary()` on the `wiki` object directly. [Read up here][3] to see when you should use the `page` object and when you should call `summary()` directly. There's a performance difference! Long story short, use the method directly if you are using only the `summary` of the page and are not expecting to use any of the other `page` attributes.

```js
const wiki = require('wikipedia');

(async () => {
	try {
		const summary = await wiki.summary('Batman');
		console.log(summary);
		//Response of type @wikiSummary - contains the intro and the main image
	} catch (error) {
		console.log(error);
		//=> Typeof wikiError
	}
})();
```
There are other methods like `search()`, `geoSearch()`, `suggest()`, `setLang()` which should be called on the wiki object directly. Read up on the [index documentation][4] to see a list of methods available.

```js
const wiki = require('wikipedia');

(async () => {
	try {
		const searchResults = await wiki.search('Batma');
		console.log(searchResults);
		//Response of type @wikiSearchResult - contains results and optionally a suggestion
		const newUrl = await wiki.setLang('fr');
		console.log(newUrl);
		//Returns the api url with language changed - use `languages()` method to see a list of available langs
	} catch (error) {
		console.log(error);
		//=> Typeof wikiError
	}
})();
```

## Options

All methods have options you can pass them

## Contributing

Before opening a pull request please make sure your changes follow the
[contribution guidelines][1].

[1]: https://github.com/dopecodez/wikipedia/blob/master/CONTRIBUTING.md
[2]: https://github.com/dopecodez/wikipedia/blob/master/docs/PAGE.md
[3]: https://github.com/dopecodez/wikipedia/blob/master/docs/USAGE.md#when-to-use-page
