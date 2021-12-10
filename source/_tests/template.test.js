describe('Templating', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:8080');
      await expect(page.title()).resolves.toMatch('Tom Anderson')
    });
  
    it('Contains a Meta description tag with data', async () => {
      const description = await page.$eval("head > meta[name='description']", element => element.content)
      await expect(description).not.toBe('')
    });

    it('Correctly preconnects to Google Fonts & Font Awesome', async () => {
        const preconnects = await page.$$eval('head > link[rel="preconnect"]', (list) => list.map((elm) => elm.href))
        await expect(preconnects).toContain("https://fonts.gstatic.com/")
        await expect(preconnects).toContain("https://kit-free.fontawesome.com/")
    });
    
    it('Has a favicon', async () => {
        const description = await page.$eval("head > link[rel='shortcut icon']", element => element.href)
        await expect(description).not.toBe('')
      });

    it('Has a linked (bundled) Tailwind CSS file', async () => {
        await expect(page.$("head > link[href='/css/bundle.css']"))
    });

  });