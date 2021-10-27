# https://github.com/KumarAbhirup/dockerized/blob/master/packages/landingpage/Dockerfile
ARG VARIANT=16
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}
# ENV PORT 3000

# # Create app directory
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app
WORKDIR /workspace

# # Installing dependencies
# COPY package*.json /usr/src/app/
# RUN npm install

# # Copying source files
# COPY . /usr/src/app


# Building app
RUN npm run build

# Running the app
CMD "npm" "run" "dev"