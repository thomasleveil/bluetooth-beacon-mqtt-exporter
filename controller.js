const EventEmitter = require('events').EventEmitter

module.exports = class Controller extends EventEmitter {

    constructor() {
        super()
        this._bluetooth_state = null
        this._mqtt_state = null
        this._requirements_are_met = false
    }

    refresh() {
        const newState = (this._bluetooth_state === 'poweredOn' && this._mqtt_state === 'connected')
        if (this._requirements_are_met != newState) {
            this.emit('requirementsStateChange', newState)
            this._requirements_are_met = newState
        }
    }

    setBluetoothState(state) {
        console.info(`Bluetooth service state: ${state}`)
        this._bluetooth_state = state
        this.refresh()
    }

    setMqttState(state) {
        this._mqtt_state = state
        this.refresh()
    }
}