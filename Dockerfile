FROM node:alpine

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Add user so we don't need --no-sandbox.
RUN addgroup -S tempuser && adduser -S -g tempuser tempuser \
    && mkdir -p /home/tempuser/Downloads /app \
    && chown -R tempuser:tempuser /home/tempuser \
    && chown -R tempuser:tempuser /app

# Run everything after as non-privileged user.
USER tempuser