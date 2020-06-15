const OBDReader = require('bluetooth-obd');
const { Board, Led, Servo } = require("johnny-five");
const player = require('play-sound')();
const board = new Board({ debug: false });

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

        // this.faceLedAlwaysOn();
        // this.turnOnSideLed();
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

    turnOnSideLed() {
        this.turnOnFirstStep()
        this.turnOnSecondStep()
        this.turnOnThirdStep()
    }

    turnOnFirstStep() {
        this.led6.on()
        this.led7.on()
    }

    turnOnSecondStep() {
        this.led2.on()
        this.led12.on()
    }

    turnOnThirdStep() {
        this.led10.on();
        this.led13.on();
    }

    blinkThirdStep() {
        this.led10.blink(60);
        this.led13.blink(60);
    }

    turnOffSideLed() {
        this.turnOffFirstStep();
        this.turnOffSecondStep();
        this.turnOffThirdStep();
    }

    stopThirdStepBlink() {
        this.led10.stop();
        this.led13.stop();
    }

    turnOffThirdStep() {
        this.led10.off();
        this.led13.off();
    }

    turnOffSecondStep() {
        this.led2.off();
        this.led12.off();
    }

    turnOffFirstStep() {
        this.led6.off();
        this.led7.off();
    }

    turnBaseTo(angle) {
        this.baseServo.to(angle);
    }

    turnFaceTo(angle) {
        this.faceServo.to(angle);
    }

    centerBase() {
        this.baseServo.to(90);
    }

    resetFaceAngle() {
        this.faceServo.to(0);
    }

    blinkPatternBusterCount(delay) {
        setTimeout(() => this.turnOnFirstStep(), 0 + delay);
        setTimeout(() => this.turnOnSecondStep(), 50 + delay);
        setTimeout(() => this.blinkThirdStep(), 100 + delay);
        setTimeout(() => { this.stopThirdStepBlink(); this.turnOffThirdStep() }, 1000 + delay);
        setTimeout(() => { this.turnOffSecondStep() }, 1050 + delay);
        setTimeout(() => { this.turnOffFirstStep() }, 1100 + delay);

        setTimeout(() => this.turnOnFirstStep(), 1500 + delay);
        setTimeout(() => this.turnOnSecondStep(), 1550 + delay);
        setTimeout(() => this.blinkThirdStep(), 1600 + delay);
        setTimeout(() => { this.stopThirdStepBlink(); this.turnOffThirdStep() }, 2000 + delay);
        setTimeout(() => { this.turnOffSecondStep() }, 2050 + delay);
        setTimeout(() => { this.turnOffFirstStep() }, 2100 + delay);

        // 4
        setTimeout(() => { this.turnOnFirstStep() }, 2800 + delay);
        setTimeout(() => { this.turnOnSecondStep() }, 2850 + delay);
        setTimeout(() => { this.turnOnThirdStep() }, 2900 + delay);
        setTimeout(() => { this.turnOffSideLed() }, 3400 + delay);

        // 3
        setTimeout(() => { this.turnOnFirstStep() }, 4000 + delay);
        setTimeout(() => { this.turnOnSecondStep() }, 4050 + delay);
        setTimeout(() => { this.turnOnThirdStep() }, 4100 + delay);
        setTimeout(() => { this.turnOffSideLed() }, 4600 + delay);

        // 2
        setTimeout(() => { this.turnOnFirstStep() }, 5000 + delay);
        setTimeout(() => { this.turnOnSecondStep() }, 5050 + delay);
        setTimeout(() => { this.turnOnThirdStep() }, 5100 + delay);
        setTimeout(() => { this.turnOffSideLed() }, 5600 + delay);

        // 1
        setTimeout(() => { this.turnOnFirstStep() }, 6000 + delay);
        setTimeout(() => { this.turnOnSecondStep() }, 6050 + delay);
        setTimeout(() => { this.turnOnThirdStep() }, 6100 + delay);
        setTimeout(() => { this.turnOffSideLed() }, 6600 + delay);

        setTimeout(() => { this.turnOnSideLed() }, 7000 + delay);
    }

    blinkInitiateBuster(delay) {
        setTimeout(() => this.turnOnFirstStep(), 0 + delay);
        setTimeout(() => this.turnOnSecondStep(), 50 + delay);
        setTimeout(() => this.blinkThirdStep(), 100 + delay);
        setTimeout(() => { this.stopThirdStepBlink(); this.turnOffThirdStep() }, 1200 + delay);
        setTimeout(() => { this.turnOffSecondStep() }, 1350 + delay);
        setTimeout(() => { this.turnOffFirstStep() }, 1400 + delay);

        setTimeout(() => this.turnOnFirstStep(), 1700 + delay);
        setTimeout(() => this.turnOnSecondStep(), 1750 + delay);
        setTimeout(() => this.blinkThirdStep(), 1800 + delay);
        setTimeout(() => { this.stopThirdStepBlink(); this.turnOffThirdStep() }, 2200 + delay);
        setTimeout(() => { this.turnOffSecondStep() }, 2250 + delay);
        setTimeout(() => { this.turnOffFirstStep() }, 2300 + delay);

        setTimeout(() => this.turnOnFirstStep(), 2600 + delay);
        setTimeout(() => this.turnOnSecondStep(), 2650 + delay);
        setTimeout(() => this.blinkThirdStep(), 2700 + delay);
        setTimeout(() => { this.stopThirdStepBlink(); this.turnOffThirdStep() }, 3900 + delay);
        setTimeout(() => { this.turnOffSecondStep() }, 3950 + delay);
        setTimeout(() => { this.turnOffFirstStep() }, 4000 + delay);

        setTimeout(() => { this.turnOnSideLed() }, 4050 + delay);

    }
}

class MusicPlayer {

    constructor() {
        this.boosterInitiate = './Resources/Audio/booster-initiate.mp3';
        this.boosterCounter = './Resources/Audio/booster-countdown.mp3';
    }

    playBoosterInitiate(asurada) {
        setTimeout(() => { asurada.turnBaseTo(85) }, 50);
        setTimeout(() => { asurada.turnFaceTo(0) }, 0);
        setTimeout(() => { asurada.turnFaceTo(90) }, 300);
        setTimeout(() => { asurada.turnFaceTo(180) }, 600);
        setTimeout(() => asurada.turnOffSideLed(), 750);
        asurada.blinkInitiateBuster(1100);

        setTimeout(() => player.play(
            this.boosterInitiate,
            (err) => {
                this.handlePlayerError(err);
            }
        ), 200);
    }

    playBoosterCountdown(asurada) {
        setTimeout(() => { asurada.turnFaceTo(180) }, 0);
        setTimeout(() => { asurada.turnFaceTo(90) }, 300);
        setTimeout(() => { asurada.turnFaceTo(0) }, 600);
        setTimeout(() => asurada.turnOffSideLed(), 400);
        asurada.blinkPatternBusterCount(600);
        setTimeout(() => player.play(
            this.boosterCounter,
            (err) => {
                this.handlePlayerError(err);
            }
        ), 300)

        setTimeout(() => {
            asurada.centerBase();
            asurada.turnFaceTo(0);
        }, 10000);
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

board.on("ready", () => {

    const AsuradaInstance = new Asurada();
    const MusicPlayerInstance = new MusicPlayer();
    btOBDReader.on('dataReceived', function (data) {
        AsuradaInstance.faceLedAlwaysOn();
        AsuradaInstance.turnOnSideLed();
        if (data && data.name === 'rpm' && data.value > 2500) {

            MusicPlayerInstance.playBoosterInitiate(AsuradaInstance);
            setTimeout(() => {
                MusicPlayerInstance.playBoosterCountdown(AsuradaInstance);
            }, 10000);
        }

    });
});





/* Default Fire Up Procedure, Set Up Carefully :) */
btOBDReader.on('connected', function () {

    this.addPoller("rpm");
    this.addPoller("vss");
    this.startPolling(15000);
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