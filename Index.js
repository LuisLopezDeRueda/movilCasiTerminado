import { endGame } from './escenas/endGame.js';
import { Game } from './escenas/game.js'


const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    scene: [Game,endGame],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
}

var game = new Phaser.Game(config);
