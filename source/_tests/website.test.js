describe('Functional', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080');
    await expect(page.title()).resolves.toMatch('Tom Anderson')
  });

  it('Generate homepage screenshot', async () => {
    await page.setViewport({ width: 1920, height: 1080 })
    await page.screenshot({ path: '_build/_testresult.png' })
  });

  it('Contains <p> with "Hi."', async () => {
    await expect(page).toMatchElement('p', { text: 'Hi.' })
  });

  it('Contains image of me', async () => {
    const imgs = await page.$eval('img', img => img.getAttribute('src'))
    await expect(imgs).toBe("/img/me.webp")
  });

  it('Contains links to LinkedIn, GitHub and Dev.to', async () => {
    const links = await page.$$eval('a', (list) => list.map((elm) => elm.href))
    await expect(links).toContain("https://www.linkedin.com/in/th0masanderson/")
    await expect(links).toContain("https://github.com/Driminary")
    await expect(links).toContain("https://dev.to/ndsn")
  });

  it('Contains Copyright notice', async () => {
    await expect(page).toMatchElement('div', { text: '©' })
  });  

  it('Contains Buy Me a Coffee mug icon (Font Awesome)', async () => {
    await expect(page.$('i.fa-mug-hot'));
  });  


});
