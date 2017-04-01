import { ActTrackPage } from './app.po';

describe('act-track App', () => {
  let page: ActTrackPage;

  beforeEach(() => {
    page = new ActTrackPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
