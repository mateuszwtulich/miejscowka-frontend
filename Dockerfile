# Stage 1

FROM node:12.22 as build-step

RUN npm install @types/d3 --save-dev

RUN mkdir -p /app-frontend

WORKDIR /app-frontend

COPY package.json /app-frontend

RUN npm install

COPY . /app-frontend

RUN npm run build --prod

# Stage 2

FROM nginx:1.21.3

COPY --from=build-step /app-frontend/dist/miejscowka-frontend /usr/share/nginx/html