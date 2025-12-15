# 1) build
FROM node:lts AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

# 2) run
FROM nginx:alpine

# удалим дефолтный конфиг
RUN rm /etc/nginx/conf.d/default.conf

# добавим наш
COPY nginx.conf /etc/nginx/conf.d/default.conf

# положим dist в папку nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
