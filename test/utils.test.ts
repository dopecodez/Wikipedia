import { isString } from '../dist/utils.js';

test('Is String returns false for numbers', () => {
    expect(isString(1)).toBe(false);
});

test('Is String returns true for strings', () => {
    expect(isString("test")).toBe(true);
});