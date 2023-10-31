# Stage 1
FROM node:20 as builder

WORKDIR /sketchbookBuild

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

COPY . .

RUN yarn build

# Stage 2
FROM node:20 as runner

WORKDIR /sketchbook


