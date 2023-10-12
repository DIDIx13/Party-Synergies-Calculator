FROM node:14-alpine

WORKDIR /app

COPY . .

# Install package.json dependencies
RUN npm install

EXPOSE 80

# Simple HTTP server for static
CMD [ "npx", "http-server", "-p", "80" ]
