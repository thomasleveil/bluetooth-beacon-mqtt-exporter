FROM arm32v7/node:8

RUN apt-get update && apt-get install -y --no-install-recommends \
        bluetooth \
        bluez \
        libbluetooth-dev \
        libudev-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /srv
COPY ./package*.json /srv
RUN npm install

COPY . /srv


ENV MQTT_BROKER=mqtt://127.0.0.1
ENV MQTT_TOPIC=beacon
ENV MQTT_RECONNECT_DELAY=5000
ENV LOG_PACKETS=no

CMD ["node", "cli.js"]
