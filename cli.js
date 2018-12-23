#!/usr/bin/env node

const BeaconScanner = require('node-beacon-scanner')
const mqtt = require('mqtt')
const Controller = require('./controller')


const mqtt_broker = process.env.MQTT_BROKER || 'mqtt://127.0.0.1'
console.info(`MQTT_BROKER: ${mqtt_broker}`)

const mqtt_topic = process.env.MQTT_TOPIC || 'beacon'
console.info(`MQTT_TOPIC: ${mqtt_topic}`)

const mqtt_reconnect_delay = parseInt(process.env.MQTT_RECONNECT_DELAY) || 5000
console.info(`MQTT_RECONNECT_DELAY: ${mqtt_reconnect_delay} ms`)

const log_packets = ['on', 'true', 'yes', '1'].includes((process.env.LOG_PACKETS || 'no').toLowerCase())
console.info(`LOG_PACKETS: ${log_packets}`)


const mqttclient  = mqtt.connect(mqtt_broker, {reconnectPeriod: mqtt_reconnect_delay})
const noble = require('noble')
const scanner = new BeaconScanner({'noble': noble})
const controller = new Controller()

controller.on('requirementsStateChange', (requirementAreMet) => {
    if (requirementAreMet) {
        scanner.startScan().then(() => {
            console.info('Started to scan')
            start_packet_count_reporter()
        }).catch((error) => {
            console.error(error)
        })
    } else {
        scanner.stopScan()
        stop_packet_count_reporter()
        console.info('Stopped to scan')
    }
})


let packet_count = null
let packet_count_reporter = null

function start_packet_count_reporter() {
    packet_count = 0
    packet_count_reporter = setInterval(() => {
        if (scanner._is_scanning) {
            console.log(`Packets seen in the last minute: ${packet_count}`)
            packet_count = 0
        }
    }, 60 * 1000)
}

function stop_packet_count_reporter() {
    if (packet_count_reporter) {
        clearInterval(packet_count_reporter)
    }
}


noble.on('stateChange', (state) => controller.setBluetoothState(state))


mqttclient.on('connect', function () {
    console.info(`Connected to mqtt broker '${mqtt_broker}'`)
    controller.setMqttState('connected')
})

mqttclient.on('close', function () {
    console.info('Mqtt connection closed')
    controller.setMqttState('disconnected')
})


// Set an Event handler for becons
scanner.onadvertisement = (ad) => {
    packet_count += 1
    const data = JSON.stringify(ad, null, '  ')
    if (log_packets) {
        console.log(data)
    }
    mqttclient.publish(mqtt_topic, data)
};