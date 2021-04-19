import * as request from '../source/request';
import wiki from "../source/index";
import { htmlString, notFoundJson } from './samples';
const requestMock = jest.spyOn(request, "makeRestRequest");

afterAll(() => {
    requestMock.mockRestore();
});

test('Returns HTML when page successfully queried', async () => {
    requestMock.mockImplementation(async () => { return htmlString });
    const result = await wiki.mobileHtml("ACID");
    expect(result).toStrictEqual(htmlString);
});

test('Returns notFound if page not found', async () => {
    requestMock.mockImplementation(async () => { return notFoundJson });
    const result = await wiki.mobileHtml("does-not-exist-on-wikipedia");
    expect(result).toEqual(notFoundJson);
});

test('Returns empty body on redirect page with redirect set to false', async () => {
    requestMock.mockImplementation(async () => { return null });
    const result = await wiki.mobileHtml("homestar", false);
    expect(result).toBeNull();
});
