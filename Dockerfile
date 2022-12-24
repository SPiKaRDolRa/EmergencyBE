FROM node:16-alpine as builder

ARG PNPM_VERSION=7.12.2
RUN npm install -g pnpm@${PNPM_VERSION}

WORKDIR /EMERGENCY_BE

COPY . ./
RUN pnpm install

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080

CMD [ "pnpm", "run", "build" ]
