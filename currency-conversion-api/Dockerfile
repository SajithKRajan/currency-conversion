# Base image
FROM node:lts-alpine 

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./currency-conversion-api/package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY ./currency-conversion-api/ .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
