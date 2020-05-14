var OBDReader = require('bluetooth-obd');
var btOBDReader = new OBDReader();

// Specify the car communications protocol rather than autodetect
// http://www.obdtester.com/elm-usb-commands
// e.g.
// 'ISO 15765-4 CAN (11 bit ID, 500 kbaud)'
//btOBDReader.setProtocol(6);

btOBDReader.on('dataReceived', function (data) {
    var currentDate = new Date();
    console.log(currentDate.getTime());
    console.log(data);
});

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
