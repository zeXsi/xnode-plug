# 1. Используем Node.js (lts)
FROM node:lts

# 2. Рабочая папка
WORKDIR /app

# 3. Копируем package*.json
COPY package.json package-lock.json ./

# 4. Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# 5. Копируем все остальные файлы
COPY . .

# 7. Собираем production-бандл в папку build
RUN npm run build
RUN npm install -g serve

# 8. Открываем порт
EXPOSE 5020

# 9. Запускаем сайт через serve
# CMD ["serve", "-s", "build"]
CMD ["serve", "-s", "dist", "-l", "5020"]
# CMD ["serve", "-s", "build", "-l", "0.0.0.0:5020"]
# CMD ["serve", "-s", "build", "-l", "tcp://0.0.0.0:5020"]