FROM node:alpine AS base

RUN npm i -g pnpm




FROM base AS dependencies

WORKDIR /usr/src/app

COPY package.json ./

RUN pnpm install




FROM base AS development

WORKDIR /usr/src/app

COPY ./ ./
COPY --from=dependencies /usr/src/app/node_modules ./node_modules




FROM base AS build

WORKDIR /usr/src/app

COPY . .
COPY package.json ./
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

RUN pnpm run build
RUN pnpm prune --prod




FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

CMD ["npm", "run preview"]
