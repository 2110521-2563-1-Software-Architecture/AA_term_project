FROM node:12.19.0

COPY . /src/
WORKDIR /src
RUN npm install
RUN npm install pm2 -g

EXPOSE 3000
CMD ["pm2-runtime", "index.js"]
