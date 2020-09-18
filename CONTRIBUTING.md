# Contributing

We welcome patches and features. There are however a few things that are
required before your pull request can be merged. Make sure you cut a branch
from develop and all PRs pointed towards develop.

# Tests

## How to write a new test case

As output from system ping varied on languages and OS, our parser may fail
on new languages or OS. To improve the correctness and coverage for this
module, we need to gather output from those system pings. For any new feature added,
we expect a new test case. Read up more about why unit testing [here](https://dzone.com/articles/top-8-benefits-of-unit-testing).

## Running test cases

Make sure your PR passes all the tests by running `npm run test` before
raising a PR.
