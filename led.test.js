const { Board, Led, Servo } = require("johnny-five");
const board = new Board();

board.on("ready", () => {

    // 1. Face Led Always On
    faceLedAlwaysOn();

    // First Step
    const led6 = new Led(6);
    const led7 = new Led(7);

    // Second Step
    const led2 = new Led(2);
    const led12 = new Led(12);

    // Third Step
    const led10 = new Led(10);
    const led13 = new Led(13);

    // Face Servo
    const faceServo = new Servo({
        pin: 3
    });

    // Base Servo
    const baseServo = new Servo({
        pin: 9
    });

    faceServo.to(0);
    baseServo.to(90);
    setTimeout(() => baseServo.to(45), 2000)
    setTimeout(() => baseServo.to(90), 4000)
    setTimeout(() => baseServo.to(45), 5000)
    setTimeout(() => baseServo.to(90), 6000)

    // "blink" the led in 500ms on-off phase periods
    // const blinkSeq = new Promise((resolve, reject) => {
    //     resolve();
    // });
    // blinkSeq.then(() => {
    //     console.log("Gogogog");
    // })

    setInterval(() => {
        setTimeout(() => blinkFirstStep(led6, led7), 0);
        setTimeout(() => blinkSecondStep(led2, led12), 50);
        setTimeout(() => blinkThirdStep(led10, led13), 100);
        setTimeout(() => { stopThirdStepBlink(led10, led13); turnOffThirdStep(led10, led13) }, 1500);
        setTimeout(() => { turnOffSecondStep(led2, led12) }, 1550);
        setTimeout(() => { turnOffFirstStep(led6, led7) }, 1600);
    }, 2500);
});

function faceLedAlwaysOn() {
    const led4 = new Led(4);
    const led5 = new Led(5);
    const led8 = new Led(8);
    const led11 = new Led(11);

    led4.on()
    led8.on()
    led5.on();
    led11.on();
}

function blinkFirstStep(led1, led2) {
    led1.on()
    led2.on()
}

function blinkSecondStep(led1, led2) {
    led1.on()
    led2.on()
}

function blinkThirdStep(led1, led2) {
    led1.blink(120);
    led2.blink(120);
}

function stopThirdStepBlink(led1, led2) {
    led1.stop();
    led2.stop();
}

function turnOffThirdStep(led1, led2) {
    led1.off();
    led2.off();
}

function turnOffSecondStep(led1, led2) {
    led1.off();
    led2.off();
}

function turnOffFirstStep(led1, led2) {
    led1.off();
    led2.off();
}

function blinkPattern1() {

}