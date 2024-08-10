FROM node:20-bullseye

WORKDIR /home/node/app

RUN apt-get update && apt-get install -y \
    bash \
    rsync \
    git \
    zip \
    unzip \
    libzip-dev \
    curl \
    dirmngr \
    apt-transport-https \
    lsb-release \
    ca-certificates

RUN npm i -g @swc/cli @swc/core