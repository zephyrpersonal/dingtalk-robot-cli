FROM node:alpine

ADD package.json .
RUN yarn install --production
ADD lib lib
ADD index.js .

ENTRYPOINT [ "node", "index" ]