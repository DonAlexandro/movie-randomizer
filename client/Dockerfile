FROM node:16
WORKDIR /client

COPY package.json ./
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; then \
      npm i \
    else \
      npm i --only=production; \
    fi

COPY . ./
CMD ["npm", "start"]
