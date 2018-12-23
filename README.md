|                       |              |                     |
|-----------------------|--------------|---------------------|
| [Documentation][doc]  |  [npm][npm]  |  [Docker Hub][hub]  | 
----

bluetooth-beacon-mqtt-exporter
==============================

This a service running on node v8 publishing Bluetooth BLE beacons advertisements on a mqtt topic.

The original intent is to make available to node-RED temperature readings from Estimote beacons ; but this will work with any beacon advertisement supported by the [node-beacon-scanner](https://github.com/futomi/node-beacon-scanner) module.


Dependencies
------------


```sh
sudo apt-get install bluetooth
```

and the bluetooth-beacon-mqtt-exporter command must be run as `root`.


Install
-------


```sh
npm install bluetooth-beacon-mqtt-exporter
```


Run
---

```sh
sudo bluetooth-beacon-mqtt-exporter
```


Configuration
-------------

Configuration is provided throught environment variables:

```sh
MQTT_BROKER=mqtt://127.0.0.1   # url of a mqtt broker. For accepted protocols, refer to https://github.com/mqttjs/MQTT.js#connect
MQTT_TOPIC=beacon              # mqtt topic beacon' advertisements will be published to
MQTT_RECONNECT_DELAY=5000      # in case of a mqtt disconnection, will wait this amount of milliseconds before retrying to connect
LOG_PACKETS=no                 # yes/on/true/1 to log every advertisement package to the console
```


Docker image for Raspberry pi
-----------------------------

A Docker image for arm is published on the Docker Hub: [tomdesinto/bluetooth-beacon-mqtt-exporter][hub]


```sh
sudo apt-get install bluetooth
sudo service bluetooth start
docker run -d \
    --net=host \
    --privileged \
    -e MQTT_BROKER=mqtt://127.0.0.1 \
    -e MQTT_TOPIC=beacon \
    -e LOG_PACKETS=yes \
    tomdesinto/bluetooth-beacon-mqtt-exporter:rpi
```

### docker-compose.yml

```yaml
version: "3"

services:
  beaconmqtt:
    image: tomdesinto/bluetooth-beacon-mqtt-exporter:rpi
    network_mode: host
    privileged: true
    environment:
      MQTT_BROKER: mqtt://127.0.0.1
      MQTT_TOPIC: beacon
      MQTT_RECONNECT_DELAY: 5000
      LOG_PACKETS: "yes"
```



Hack
----


### Install dependencies

```
sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev
```


### Run the services


```
sudo service bluetooth start
sudo MQTT_BROKER=mqtt://127.0.0.1 MQTT_TOPIC=beacon npm run start
```


[doc]: https://github.com/thomasleveil/bluetooth-beacon-mqtt-exporter#readme
[hub]: https://hub.docker.com/r/tomdesinto/bluetooth-beacon-mqtt-exporter
[npm]: https://www.npmjs.com/package/bluetooth-beacon-mqtt-exporter