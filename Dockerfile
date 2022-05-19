FROM node:14 as builder

WORKDIR /usr/src/app

COPY . .

RUN npm ci
RUN npm run build

### RUN STAGE ###
FROM lipanski/docker-static-website:latest

COPY --from=builder /usr/src/app/build .
COPY start.sh .

CMD ["bash", "start.sh"]
