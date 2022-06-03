FROM node:14.16.0-alpine

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . ./

CMD ["yarn", "start"]
