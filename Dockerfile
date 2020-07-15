FROM node
RUN sudo apt-get update \
    && sudo apt-get install -y chromium
