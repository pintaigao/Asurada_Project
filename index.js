var OBDReader = require('bluetooth-obd');
var btOBDReader = new OBDReader();

/* Specify the car communications protocol rather than autodetect
http://www.obdtester.com/elm-usb-commands
e.g.
'ISO 15765-4 CAN (11 bit ID, 500 kbaud)'
btOBDReader.setProtocol(6); */

/* data format: { mode: '41', pid: '0C', name: 'rpm', value: 714 } */

btOBDReader.on('dataReceived', function (data) {

    if (data && data.name === 'rpm') {
        renderSound(data);
    }
});

function renderSound(data) {
    let rpmNum = data.value;
    if (rpmNum === 0) {

    } else if (rpmNum > 0 && rpmNum < 1100) {

    }
}

btOBDReader.on('connected', function () {
    this.addPoller("rpm");
    // this.addPoller("vss");
    // this.addPoller("temp");
    // this.addPoller("load_pct");
    // this.addPoller("map");
    // this.addPoller("frp");

    // Request all values per second.
    this.startPolling(1000);
});

btOBDReader.on('error', function (data) {
    console.log('Error: ' + data);
});

btOBDReader.on('debug', function (data) {
    console.log('Debug: ' + data);
});

// Search and Connect to OBDII(ELM327)
console.log("Start connecting to OBDII");
btOBDReader.autoconnect('obd');
