FROM node:16

# # Create app directory
RUN mkdir -p /workspace
WORKDIR /workspace

# Installing dependencies
COPY package*.json ./

RUN yarn install

# Running the app dev server
CMD ["yarn", "dev"]