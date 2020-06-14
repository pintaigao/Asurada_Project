const { Board, Servo } = require("johnny-five");
const board = new Board();

board.on("ready", () => {
    const baseServo = new Servo({
        pin: 9
    });

    const faceServo = new Servo({
        pin: 3
    });

    // Add servo to REPL (optional)
    board.repl.inject({
        faceServo,
        baseServo
    });

    setTimeout(() => baseServo.to(90), 0);
    setTimeout(() => faceServo.to(0), 0);
});
