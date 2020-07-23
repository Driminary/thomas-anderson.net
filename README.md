# Source code for www.Thomas-Anderson.net

![Build and Test](https://github.com/Driminary/thomas-anderson.net/workflows/Build%20and%20Test/badge.svg)
[![CodeFactor](https://www.codefactor.io/repository/github/driminary/thomas-anderson.net/badge/master)](https://www.codefactor.io/repository/github/driminary/thomas-anderson.net/overview/master)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/da73e8a2/thomas-anderson.net)
[![Built with eleventy](https://img.shields.io/badge/Built%20with%2011ty-%E2%9C%93-brightgreen?logo=eleventy)](https://11ty.dev)
[![Firebase hosting](https://img.shields.io/badge/Firebase%20Hosting-%E2%9C%93-brightgreen?logo=firebase)](https://firebase.google.com/products/hosting)

> This repo contains the end-to-end source code for www.thomas-anderson.net and is published entirely free and under the MIT License - Hopefully the code and below description explains the architecture well!

> If you do end up using this for any commercial purpose, or found the code useful please consider buying me a coffee:
[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-orange?logo=Buy%20Me%20A%20Coffee&logoColor=white)](https://www.buymeacoffee.com/ndsn)

## Architecture

![Architecture](https://i.ibb.co/QQ1s2Fx/thomas-anderson-net-architecture.png)
*(Click image to view full size. Made with [Excalidraw](https://excalidraw.com) - raw file: **architecture.excalidraw**)*

Source folder : **```source```**
Output folder : **```_build```**

To build, test and deploy:
```bash
npm install
npm run build
npm run test
firebase deploy
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

## Deploy (Firebase)

We use [Firebase hosting](https://firebase.google.com/docs/hosting/quickstart) for our site. First, [install the firebase-cli](https://firebase.google.com/docs/cli#install_the_firebase_cli) and run:

```bash
firebase init
```

Then once configured, run:
```bash
firebase deploy
```

### Multiple site deployment

To use multiple sites in the same project, configure deploy targets:

```bash
firebase target:apply hosting production production-firebase-sitename
firebase target:apply hosting staging staging-firebase-sitename
```

Then to deploy to staging:

```bash
firebase deploy --only hosting:staging
```

And production:

```bash
firebase deploy --only hosting:production
```

### CSP SHA256 values

We apply CSP headeers in Firebase for added security. For reference, there are parts of the code that are currently inline (insecurely!) so we've added SHA-based exceptions for these as follows: 

```sha256-JsRL36rgIjQ1F+HI/2I0qTCgNGIKxeSv0ox5Yk0mj80=``` :

```javascript
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-HMXDEQWMJW');
```

```this.media='all'``` : ```sha256-MhtPZXr7+LpJUY5qtMutB+qWfQtMaPccfe7QXtCcEYc=```

```(Test result page inline CSS)``` : ```sha256-JOzLlPMErmaESDPXojMrIfRz/APutBSoFpHo1zKbbMc=```
