import { RokidManagerFePage } from './app.po';

describe('rokid-manager-fe App', () => {
  let page: RokidManagerFePage;

  beforeEach(() => {
    page = new RokidManagerFePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
