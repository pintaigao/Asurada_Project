const player = require('play-sound')();

player.play('./Resources/Audio/summer.mp3', (err) => {
    if (err) console.log(`Could not play sound: ${err}`);
});