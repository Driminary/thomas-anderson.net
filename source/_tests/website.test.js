describe('Functional', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080');
    await expect(page.title()).resolves.toMatch('Tom Anderson')
  });

  it('Generate homepage screenshot', async () => {
    await page.screenshot({path: '_build/_testresult.png'})
  });

  it('Contains H1 with "Hi."', async () => {
    await expect(page).toMatchElement('p', { text: 'Hi.' })
  });

  it('Contains image of me', async () => {
    const imgs = await page.$eval('img', img => img.getAttribute('src'))
    await expect(imgs).toBe("/img/mesmaller.jpg")
  });

});
