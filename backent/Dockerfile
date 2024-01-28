# Используйте образ Node.js LTS
FROM node

# Устанавливаем зависимости
WORKDIR /app
COPY /package.json ./

RUN npm i

# Копируем остальные файлы проекта
COPY . .

EXPOSE 5000

# Запускаем бэкенд
CMD ["node", "index.js"]
