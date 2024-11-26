FROM node:lts-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci
# RUN npm install -g @nestjs/cli
RUN npm run build
ENV NODE_ENV=production

EXPOSE 3000
CMD [ "node", "dist/main" ]