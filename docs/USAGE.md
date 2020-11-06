# Usage Recommendations

## Highlights

- [When to use page](#when-to-use-page)

## When to use page

All the page functions like `summary()`, `images()`, `html()`(and the rest!) can be called directly from the `wiki` object. Note here that both the functions will output the same result!

```js
const wiki = require('wikipedia');

(async () => {
	try {
        const page = await wiki.page('Batman');
		console.log(response);
		//Response of type @Page object
		const summaryThroughPage = await page.summary();
		console.log(summary);
		const summaryWithoutPage = await wiki.summary('Batman');
        console.log(summary);
        // summaryThroughPage = summaryWithoutPage
		//Response of type @wikiSummary - contains the intro and the main image
	} catch (error) {
		console.log(error);
		//=> Typeof wikiError
	}
})();
```
Internally, if you call the function directly on the `wiki` object, theres only one API being called while if you call the `page()` and then `summary()`, it'll be two APIs called.

**When to use the `page()` method?** Only use the `page()` method if you are going to use multiple attributes in the same page. Once you have a `Page` object, the loading of fields in this will be faster, so make sure you're using `page()` if you want to use multiple attributes within a page. Page objects are also helpful in case you want to `preload` some fields, and get the attributes you want to use along with the page object itself.

