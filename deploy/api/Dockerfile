FROM openjdk:8-jdk-alpine
RUN apk add --no-cache curl tar bash procps
COPY basket-api .
RUN mkdir /__files || true
RUN chmod 0777 -R /__files
RUN chmod 0777 start.sh
RUN ls -la
ENTRYPOINT ["./start.sh"]