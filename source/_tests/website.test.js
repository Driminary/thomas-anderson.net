describe('Functional', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080');
    await expect(page.title()).resolves.toMatch('Tom Anderson - Home')
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

  it('Contains link to "About" page.', async () => {
    const about = await page.$x("//a[contains(., 'About')]")
    expect(about.length > 0)
  });

  it('Can navigate to "About" page via navbar.', async () => {
    const about = await page.$x("//a[contains(., 'About')]")
    await Promise.all([
      about[0].click(),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);
    await expect(page.title()).resolves.toMatch('Tom Anderson - About')
  });

});
