import { test } from 'jest';
import { isString } from 'dist/utils.js';

test('adds 1 + 2 to equal 3', () => {
    expect(isString(1)).toBe(false);
});