FROM keymetrics/pm2:latest-alpine

COPY client client/
COPY server server/
COPY scripts scripts/
COPY ecosystem.config.js .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
ENV SKIP_TEST=true
RUN cd scripts && sh test-dependencies.sh

EXPOSE 8080
CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "production" ]