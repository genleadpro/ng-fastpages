# The builder from node image
FROM node:alpine as builder

# build-time variables
# prod|sandbox its value will be come from outside
ARG configuration=production

# alphine image dit not preinstalled git and related for npm usgae
RUN apk update && apk upgrade && apk add --no-cache make git openssh bash

# Move our files into directory name "app"
WORKDIR /app
COPY package.json package-lock.json  /app/
RUN npm install @angular/cli@7.2.0 -g
RUN cd /app && npm install
COPY .  /app

# Build with $configuration variable from outside
RUN cd /app && npm run build -- --output-path=./dist/out --configuration=$configuration

# Build a small nginx image with static website
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
