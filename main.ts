function doMode () {
    if (uartdata == "S") {
        for (let index = 0; index < 10; index++) {
            pins.digitalWritePin(DigitalPin.P1, 0)
            basic.pause(100)
            pins.digitalWritePin(DigitalPin.P1, 1)
            basic.pause(100)
        }
    } else {
        if (uartdata == "c") {
            pins.digitalWritePin(DigitalPin.P1, 0)
            pins.digitalWritePin(DigitalPin.P2, 0)
        }
    }
}
function doMode2 () {
	
}
bluetooth.onBluetoothConnected(function () {
    basic.pause(1000)
    connected = true
    while (connected) {
        uartdata = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
        doMotors()
        doMode()
    }
})
bluetooth.onBluetoothDisconnected(function () {
    connected = false
})
function doMotors () {
    if (uartdata == "A") {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speed)
    } else if (uartdata == "B") {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, speed)
    } else if (uartdata == "C") {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speed)
        maqueen.motorStop(maqueen.Motors.M1)
    } else if (uartdata == "D") {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed)
        maqueen.motorStop(maqueen.Motors.M2)
    } else if (uartdata == "E") {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, speed)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speed)
    } else if (uartdata == "F") {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, speed)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed)
    } else if (uartdata == "0") {
        maqueen.motorStop(maqueen.Motors.All)
    }
}
let uartdata = ""
let speed = 0
let connected = false
led.enable(false)
bluetooth.setTransmitPower(7)
bluetooth.startUartService()
connected = false
speed = 100
