# React 프론트엔드용 Dockerfile
FROM node:16

# 작업 디렉터리 설정
WORKDIR /app

# 의존성 설치
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install

# 코드 복사
COPY . /app/

# 앱 빌드
RUN npm run build

# 웹 서버 실행
CMD ["npm", "start"]
