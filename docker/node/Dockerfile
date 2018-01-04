FROM node:8-slim

WORKDIR /opt/app/
RUN npm install nodemon -g

COPY ./package.json ./
COPY ./webpack.prod.config.js ./
COPY ./webpack.config.js ./
COPY ./.babelrc ./
COPY ./nodemon.json ./
RUN yarn install

RUN NODE_ENV=development
CMD yarn dev
