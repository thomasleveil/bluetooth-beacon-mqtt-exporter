bluetooth-beacon-mqtt-exporter
==============================

This a service running on node v8 publishing Bluetooth BLE beacons advertisements on a mqtt topic.

The original intent is to make available to node-RED temperature readings from Estimote beacons ; but this will work with any beacon advertisement supported by the [node-beacon-scanner](https://github.com/futomi/node-beacon-scanner) module.


Dependencies
------------


```
sudo apt-get install bluetooth
```

and the bluetooth-beacon-mqtt-exporter command must be run as `root`.


Install
-------


```
npm install bluetooth-beacon-mqtt-exporter
```


Run
---

```
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

A Docker image for arm is published on the Docker Hub: [tomdesinto/bluetooth-beacon-mqtt-exporter](https://cloud.docker.com/repository/docker/tomdesinto/bluetooth-beacon-mqtt-exporter)


```
docker run -d -e MQTT_BROKER=mqtt://127.0.0.1 MQTT_TOPIC=beacon tomdesinto/bluetooth-beacon-mqtt-exporter:rpi
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
