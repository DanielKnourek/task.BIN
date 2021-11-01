# https://github.com/KumarAbhirup/dockerized/blob/master/packages/landingpage/Dockerfile
# FROM node:lts-alpine3.14
FROM node:12

ENV PORT 3000
# RUN apk add git

ENV CHOKIDAR_USEPOLLING=true

# # Create app directory
# RUN mkdir -p /usr/src/app
RUN mkdir -p /home/workspace
# WORKDIR /usr/src/app
WORKDIR /home/workspace

# Installing dependencies
COPY package*.json /home/workspace/
RUN yarn install
# RUN npm install --no-bin-links

# # Copying source files
COPY . /home/workspace

# Building app
RUN yarn build

# Running the app dev server
CMD yarn dev