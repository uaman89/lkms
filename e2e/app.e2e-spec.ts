import { LakmusPage } from './app.po';

describe('lakmus App', () => {
  let page: LakmusPage;

  beforeEach(() => {
    page = new LakmusPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
