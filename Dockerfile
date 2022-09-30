FROM node:14

ARG ENV
ARG apiPath

WORKDIR /var/app

COPY . .

ENV ENV=develop

RUN yarn install

RUN yarn build

EXPOSE 8080

CMD [ "yarn", "start" ]