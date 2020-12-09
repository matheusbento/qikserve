FROM node:12

ENV NODE_ENV development

RUN mkdir -p /node_modules

RUN apt-get update && apt-get install -yq libgconf-2-4

COPY basket-app/package.json .

RUN set NODE_PATH=/application/node_modules

COPY basket-app .

COPY basket-app/entry-point.sh /entrypoint

RUN chmod 0777 /entrypoint

ENTRYPOINT ["/entrypoint"]
