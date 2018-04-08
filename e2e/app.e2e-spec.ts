import { HwVodPage } from './app.po';

describe('hw-vod App', () => {
  let page: HwVodPage;

  beforeEach(() => {
    page = new HwVodPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
