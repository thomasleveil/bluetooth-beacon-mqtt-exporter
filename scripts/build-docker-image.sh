#!/bin/bash
set -eu
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"  # https://stackoverflow.com/a/246128/107049

if ! grep -c "Raspberry Pi" /proc/device-tree/model; then
    echo "ERROR: this script must be run from a Raspberry Pi"
    exit 2
fi

DOCKER_IMAGE=tomdesinto/bluetooth-beacon-mqtt-exporter:rpi


docker build -t ${DOCKER_IMAGE} ${DIR}/..
