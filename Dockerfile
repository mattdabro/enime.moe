FROM node:18-alpine AS development

RUN apk update
RUN apk add --no-cache tini

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global \
    PATH=$PATH:/home/node/.npm-global/bin:/home/node/node_modules/.bin:$PATH

RUN mkdir -p /usr/src/app/node_modules

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock*.yaml ./

COPY . /usr/src/app/
RUN npm install --legacy-peer-deps
RUN npm run build

EXPOSE 5000

ENV NUXT_HOST=0.0.0.0
ENV PORT=5000

CMD [ "npm", "start" ]