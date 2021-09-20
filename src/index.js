import Game from './core/Game.js';

document.addEventListener("DOMContentLoaded", function (event) {
    window.game = new Game(800, 600, 60, document.querySelector('body'))
    window.game.init();
});