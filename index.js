const bluetooth = require("@abandonware/noble");
bluetooth.startScanning(["A440E3CD-C26B-4EAD-8066-13BE0D3F0EB1"], true, (err) => {
    console.log("There may be a error");
    console.log(err);
});
