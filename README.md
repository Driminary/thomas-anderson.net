# Source code for [www.Thomas-Anderson.net](https://www.thomas-anderson.net/?utm_source=github)

![Build and Test](https://github.com/Driminary/thomas-anderson.net/workflows/Build%20and%20Test/badge.svg)
[![CodeFactor](https://www.codefactor.io/repository/github/driminary/thomas-anderson.net/badge/master)](https://www.codefactor.io/repository/github/driminary/thomas-anderson.net/overview/master)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/da73e8a2/thomas-anderson.net)
[![Built with eleventy](https://img.shields.io/badge/Built%20with%2011ty-%E2%9C%93-brightgreen?logo=eleventy)](https://11ty.dev)
[![Hosted on Vercel](https://img.shields.io/badge/Vercel Hosting-%E2%9C%93-brightgreen?logo=vercel)](https://vercel.com/)

> This repo contains the end-to-end source code for [www.thomas-anderson.net](https://www.thomas-anderson.net/?utm_source=github) and is published entirely free and under the MIT License - Hopefully the code and below description explains the architecture well!

> If you do end up using this for any commercial purpose, or found the code useful please consider buying me a coffee:
[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-orange?logo=Buy%20Me%20A%20Coffee&logoColor=white)](https://www.buymeacoffee.com/ndsn)

## Architecture

![Architecture Diagram](https://i.ibb.co/fS76DRc/architecture.png)
*(Click image to view full size. Made with [Excalidraw](https://excalidraw.com) - raw file: **architecture.excalidraw**)*

Source folder : **```source```**
Output folder : **```_build```**

To build, test and deploy:
```bash
npm install
npm run build
npm run test
vercel --prod
```

Please note, for jest-puppeteer automated testing, you will need a browser installed on your environment. For Debian-based systems, (I use [Google Cloud Shell](https://cloud.google.com/shell)) I would suggest installing Chromium:

```bash
sudo apt-get install chromium
```

## HTML Build

For HTML, we use Liquid templates and [eleventy](https:/11ty.io). We also manually copy across the ```/source/img/``` folder and the ```/source/css/bundle.css``` file.

To build the HTML:
```bash
npx @11ty/eleventy
```

To watch for file changes:
```bash
npx @11ty/eleventy --serve
```

## CSS Build

We use TailwindCSS, with the raw CSS file in ```source/css/tailwind.css```. This is then processed using PostCSS as per the documentation into ```source/css/bundle.css```.

The two configuration files (```tailwind.config.js``` and ```postcss.config.js```) are set up to check for two environment variables:

```PURGE``` and ```MINIMISE```

When set, ```PURGE``` will look through any .html and .liquid files in /source/ and will purge any unused CSS classes from Tailwind.

When set, ```MINIMISE``` enables the cssnano PostCSS plugin to minify the resulting ```bundle.css``` file.

To build the CSS (**without** purge and minimise):
```bash
npx postcss source/css/tailwind.css -o source/css/bundle.css --verbose
```

To build the CSS (**with** purge and minimise):
```bash
PURGE=true MINIMISE=true npx postcss source/css/tailwind.css -o source/css/bundle.css --verbose
```

## Testing

We use Puppeteer, Jest and jest-puppeteer to run tests in headless chromium.

On Debian-based systems, run the following to ensure dependencies are available:

```bash
sudo apt-get install chromium
```

All tests are available in ```source/_tests```. A screenshot of each test run is saved to **_build/_testresult.png** and a report is saved to **_build/_testresult.html**.

To run Jest tests:
```bash
npx jest --verbose
```

## Deploy (Vercel)

We use [Vercel](https://vercel.com) for our site. First, [install the Vercel CLI](https://vercel.com/cli) and run:

```bash
vercel login
```

Then once configured, run:
```bash
vercel
```
To deploy a preview deployment.

Then run:
```bash
vercel --prod
```
To deploy to production.