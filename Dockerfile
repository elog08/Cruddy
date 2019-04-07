FROM keymetrics/pm2:latest-alpine

# NPM build depedencies
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && apk del .gyp

VOLUME [ "/server/htpasswd" ,  "/server/data"]
COPY client client/
COPY server server/
COPY scripts scripts/
COPY ecosystem.config.js .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm cache verify
RUN cd client && npm install
RUN cd server && npm install

EXPOSE 80
CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "production" ]
