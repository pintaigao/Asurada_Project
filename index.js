const OBDReader = require('bluetooth-obd');
const { Board, Led } = require("johnny-five");
const player = require('play-sound')();
const board = new Board();

/* Specify the car communications protocol rather than autodetect
http://www.obdtester.com/elm-usb-commands
e.g.
'ISO 15765-4 CAN (11 bit ID, 500 kbaud)'
btOBDReader.setProtocol(6); */

/* data format: { mode: '41', pid: '0C', name: 'rpm', value: 714 } */
var btOBDReader = new OBDReader();
btOBDReader.on('dataReceived', function (data) {
    console.log(data)

    if (data && data.name === 'rpm') {
        renderSound(data);
    }
});


btOBDReader.on('connected', function () {
    this.addPoller("rpm");
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


/* Face Motor Spin*/
class FaceMotor {

}

/*  LED Blink */
class LedBlink {

    startBlink(ledId, length) {
        ledId.blink(length);
    }

    shuntOffBlink(ledId) {
        ledId.stop(); ledId.off()
    }

    turnOn(ledId) {
        ledId.on();
    }

    onReady() {
        board.on("ready", () => {
            const led13 = new Led(13);
        });
    }
}

/* Station Spin */
class Station {

}

/* Music Related */
class MusicPlayer {

    renderSound(data) {
        let rpmNum = data.value;
        if (rpmNum > 1000 && rpmNum < 2000) {
            console.log("Go to here")
            player.play('./Resources/Audio/bc.mp3', (err) => {
                console.log("error detect")
                handlePlayerError(err);
            });
        } else if (rpmNum > 2000) {
            player.play('./Resources/Audio/booster-rocket-countdown.mp3', (err) => {
                handlePlayerError(err);
            });
        }
    }

    handlePlayerError(err) {
        let ledBlink = new LedBlink;
        console.log(ledBlink);
    }

}

/* OBD Connector */
class OBDConnector {

}
