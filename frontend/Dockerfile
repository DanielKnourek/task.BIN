# FROM node:lts-alpine3.14
FROM node:16

# # Create app directory
RUN mkdir -p /workspace
WORKDIR /workspace

# Installing dependencies
COPY package*.json ./

RUN yarn install

# Building app
RUN yarn build

# Running the app dev server
CMD ["yarn", "dev"]