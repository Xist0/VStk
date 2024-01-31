# Используем базовый образ для сборки фронтенда
FROM node:lts as frontend-builder

# Устанавливаем рабочую директорию для фронтенда
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости фронтенда
RUN npm install

# Копируем остальные файлы фронтенда
COPY . .

# Собираем фронтенд
RUN npm run build

# Создаем образ для веб-сервера
FROM nginx:alpine

# Копируем собранные статические файлы в образ Nginx
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# Указываем порт, который будет использоваться приложением (по умолчанию для Nginx - 80)
EXPOSE 80

# Команда для запуска Nginx (обычно не требует изменений)
CMD ["nginx", "-g", "daemon off;"]
