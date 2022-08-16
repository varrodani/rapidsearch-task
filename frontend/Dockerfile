FROM node:16.14.2-alpine

WORKDIR /usr/app

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . ./

EXPOSE 3000

USER root
RUN echo 'fs.inotify.max_user_watches=1048575' >> /etc/sysctl.conf

CMD ["npm", "start"]