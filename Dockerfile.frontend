# Используйте образ Node.js LTS
FROM node:lts as builder

# Устанавливаем зависимости
WORKDIR /app
COPY package*.json ./
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем фронтенд
RUN npm run build

EXPOSE 5173

# Запускаем статический сервер
CMD ["npm", "run", "dev"]
