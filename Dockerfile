# Используйте образ Node.js LTS
FROM node:lts as builder

# Устанавливаем зависимости
WORKDIR /app
COPY package*.json ./
RUN npm install

# Копируем остальные файлы проекта
COPY . .


EXPOSE 80

# Запускаем статический сервер
CMD ["npm", "run", "dev"]
