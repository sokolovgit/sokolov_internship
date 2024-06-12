FROM node:22
WORKDIR /app
COPY package*.json ./
RUN rm -rf node_modules package-lock.json
RUN yarn cache clean
RUN yarn install
COPY . .
EXPOSE 5173
CMD ["yarn", "dev"]