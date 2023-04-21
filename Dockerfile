FROM node:18.15.0-slim

WORKDIR /home/node/app

USER root 

RUN apt-get update && apt install sqlite3 -y

USER node

CMD ["sh","-c","npm install && tail -f /dev/null"]