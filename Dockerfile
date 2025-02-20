# 1. Node.js를 사용하여 프로젝트 빌드
FROM node:18 as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# 2. Nginx를 사용하여 정적 파일 서빙
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
