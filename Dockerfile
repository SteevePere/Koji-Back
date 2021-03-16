# pull base image (node 14 LTS until 2023)
FROM node:14.16.0-alpine3.10

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# add app
COPY . ./

# build
RUN npm run build

# start app in production mode (runs "node dist/main")
CMD ["npm", "run", "start:prod"]
