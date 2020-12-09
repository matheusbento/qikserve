#!/bin/bash

host="localhost"
port="8081"

java -jar wiremock-standalone-2.27.2.jar --port $port --enable-stub-cors
echo "Wiremock started on host $host and port $port. PID : $!"
