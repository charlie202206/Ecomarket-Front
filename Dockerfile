FROM node:16-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
COPY ./dist ./dist
COPY ./node_modules ./node_modules
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
