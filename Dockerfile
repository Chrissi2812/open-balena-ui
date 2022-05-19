FROM node:14 as builder

WORKDIR /usr/src/app

COPY . .

RUN npm ci
RUN npm run build

### RUN STAGE ###
FROM lipanski/docker-static-website:latest

COPY --from=builder /usr/src/app/build .

CMD ["/thttpd", "-D", "-h", "0.0.0.0", "-p", "80", "-d", "/home/static", "-u", "static", "-l", "-", "-M", "60"]
