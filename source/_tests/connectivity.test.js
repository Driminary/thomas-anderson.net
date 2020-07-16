describe('Connectivity', () => {
  beforeAll(async () => {
  });

  it('Can connect to Google', async () => {
    await page.goto('https://google.com');
    await expect(page.title()).resolves.toMatch('Google');
  });

  it('Can connect to Local Webserver', async () => {
    await page.goto('http://localhost:8080');
  });

});