const OBDReader = require('bluetooth-obd');
const { Board, Led, Servo } = require("johnny-five");
const player = require('play-sound')();
const board = new Board();

/* Specify the car communications protocol rather than autodetect
http://www.obdtester.com/elm-usb-commands
e.g.
'ISO 15765-4 CAN (11 bit ID, 500 kbaud)'
btOBDReader.setProtocol(6); */


/* ================== Class Area ================== */
/* Asurada 本体 */
class Asurada {
    constructor() {
        // First Step
        this.led6 = new Led(6);
        this.led7 = new Led(7);

        // Second Step
        this.led2 = new Led(2);
        this.led12 = new Led(12);

        // Third Step
        this.led10 = new Led(10);
        this.led13 = new Led(13);

        // Face Servo
        this.faceServo = new Servo({
            pin: 3
        });

        // Base Servo
        this.baseServo = new Servo({
            pin: 9
        });

        this.centerBase();
        this.resetFaceAngle();
    }

    startBlink(ledId, length) {
        ledId.blink(length);
    }

    shuntOffBlink(ledId) {
        ledId.stop(); ledId.off()
    }

    turnOn(ledId) {
        ledId.on();
    }

    faceLedAlwaysOn() {
        const led4 = new Led(4);
        const led5 = new Led(5);
        const led8 = new Led(8);
        const led11 = new Led(11);

        led4.on()
        led8.on()
        led5.on();
        led11.on();
    }

    blinkFirstStep(led1, led2) {
        this.led1.on()
        this.led2.on()
    }

    blinkSecondStep(led1, led2) {
        this.led1.on()
        this.led2.on()
    }

    blinkThirdStep(led1, led2) {
        this.led1.blink(120);
        this.led2.blink(120);
    }

    stopThirdStepBlink(led1, led2) {
        this.led1.stop();
        this.led2.stop();
    }

    turnOffThirdStep(led1, led2) {
        this.led1.off();
        this.led2.off();
    }

    turnOffSecondStep() {
        this.led1.off();
        this.led2.off();
    }

    turnOffFirstStep() {
        this.led1.off();
        this.led2.off();
    }

    turnBaseTo(baseServo, angle) {
        baseServo.to(angle);
    }

    centerBase() {
        this.baseServo.to(90);
    }

    resetFaceAngle() {
        this.faceServo.to(0);
    }

    blinkPattern1() {
    }
}

/* Music Related */
class MusicPlayer {

    constructor() {
        this.boosterCounter = './Resources/Audio/booster-rocket-countdown.mp3';
    }

    playBoosterCountDown(asurada) {
        asurada.turnBaseTo(30);
        setTimeout(() => {
            player.play(
                this.boosterCounter,
                (err) => {
                    handlePlayerError(err);
                });
        }, 500);
    }

    handlePlayerError(err) {
        console.log(err);
    }

}

/* TODO:OBD Connector */
class OBDConnector { }
/* ========================================================================================= */

/* Bt本体Area */

/* data format: { mode: '41', pid: '0C', name: 'rpm', value: 714 } */
var btOBDReader = new OBDReader();


btOBDReader.on('dataReceived', function (data) {
    const MusicPlayerInstance = new MusicPlayer();
    board.on("ready", () => {
        const AsuradaInstance = new Asurada();
        AsuradaInstance.centerBase();
        if (data && rpmNum > 4000 && vssNum >= 60) {
            MusicPlayerInstance.playBoosterCountDown(AsuradaInstance, data);
        }
    });
});



/* Default Fire Up Procedure, Set Up Carefully :) */
btOBDReader.on('connected', function () {
    this.addPoller("rpm");
    this.addPoller("vss");
    // Request all values per second.
    this.startPolling(20000);
});

btOBDReader.on('error', function (data) {
    console.log('Bluetooth Reader Error: ' + data);
});

btOBDReader.on('debug', function (data) {
    console.log('Bluetooth Reader Debug: ' + data);
});

// Search and Connect to OBDII(ELM327)
console.log("Start connecting to OBDII");
btOBDReader.autoconnect('obd');