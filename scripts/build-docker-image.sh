#!/bin/bash
set -eu
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"  # https://stackoverflow.com/a/246128/107049

if ! grep -c "Raspberry Pi" /proc/device-tree/model; then
    echo "ERROR: this script must be run from a Raspberry Pi"
    exit 2
fi

DOCKER_IMAGE=tomdesinto/bluetooth-beacon-mqtt-exporter:rpi


docker build \
    -t ${DOCKER_IMAGE} \
    --label org.label-schema.build-date="$(date -u +'%Y-%m-%dT%H:%M:%SZ')" \
    --label org.label-schema.name="bluetooth-beacon-mqtt-exporter" \
    --label org.label-schema.description="service publishing Bluetooth BLE beacons advertisements on a mqtt topic" \
    --label org.label-schema.usage="https://github.com/thomasleveil/bluetooth-beacon-mqtt-exporter#readme" \
    --label org.label-schema.url="https://github.com/thomasleveil/bluetooth-beacon-mqtt-exporter" \
    --label org.label-schema.vcs-url="https://github.com/thomasleveil/bluetooth-beacon-mqtt-exporter.git" \
    --label org.label-schema.vcs-ref="$(git describe --always --dirty | sed 's/^v//')" \
    --label org.label-schema.version="$(git describe --always --tags --dirty | sed 's/^v//')" \
    --label org.label-schema.schema-version="1.0" \
    ${DIR}/..
