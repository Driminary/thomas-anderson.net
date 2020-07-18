# 11ty-based Thomas-Anderson.net

eleventy config file: **```.eleventy.js```**

Source folder : **```source```**
Output folder : **```_build```**

To build, test and deploy:
```
apt-get -y install chromium
npm install
npm run build
npm run test
firebase deploy
```

## HTML Build

For HTML, we use Liquid templates and [eleventy](https:/11ty.io). We also manually copy across the ```/source/img/``` folder and the ```/source/css/bundle.css``` file.

To build the HTML:
```
npx @11ty/eleventy
```

## CSS Build

We use TailwindCSS, with the raw CSS file in ```source/css/tailwind.css```. This is then processed using PostCSS as per the documentation into ```source/css/bundle.css```.

The two configuration files (```tailwind.config.js``` and ```postcss.config.js```) are set up to check for two environment variables:

```PURGE``` and ```MINIMISE```

When set, ```PURGE``` will look through any .html and .liquid files in /source/ and will purge any unused CSS classes from Tailwind.

When set, ```MINIMISE``` enables the cssnano PostCSS plugin to minify the resulting ```bundle.css``` file.


To build the CSS (**without** purge and minimise):
```
npx postcss source/css/tailwind.css -o source/css/bundle.css --verbose
```

To build the CSS (**with** purge and minimise):
```
PURGE=true MINIMISE=true npx postcss source/css/tailwind.css -o source/css/bundle.css --verbose
```

## Testing

We use Puppeteer, Jest and jest-puppeteer to run tests in headless chromium.

On Cloud Shell, run the following to ensure dependencies are available:

```
sudo apt-get install chromium
```

All tests are available in ```source/_tests```. A screenshot of each test run is saved to **_build/_testresult.png**.

## Web Server

First, build the full TailwindCSS bundle.css without purging to ensure all tailwind classes are available to us. (See above CSS build).

To serve the _build folder and watch it for liquid and HTML changes:
```
npx @11ty/eleventy --serve
```

## CSP SHA256 values:
```var galite = galite || {}; galite.UA = 'UA-85751744-1';``` : ```sha256-Qk4ZvBiWsQt5FiAQLxDel0BuLPZWTlucU2kOWgqQq7Y=```
```this.media='all'``` : ```sha256-MhtPZXr7+LpJUY5qtMutB+qWfQtMaPccfe7QXtCcEYc='```
```(Test result page inline CSS)``` : ```sha256-JOzLlPMErmaESDPXojMrIfRz/APutBSoFpHo1zKbbMc=```

## Deploy (Firebase)

We use Firebase hosting for our site. First, add and configure your sites in Firebase. To use multiple sites in the same project, configure deploy targets:

```
firebase target:apply hosting production anderson-an9304
firebase target:apply hosting staging staging-anderson-an9304
```

Then to deploy to staging:

```
firebase deploy --only hosting:staging
```

And production:

```
firebase deploy --only hosting:production
```