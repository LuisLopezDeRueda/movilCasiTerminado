import { VidasJ2 } from "./VidasJ2"
import { endGame } from "./endGame";
import { Vidas } from "./vidas";

export class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
        this.gameStarted = false;
        this.openingText = null;
        this.cursors = null;
        this.keys = {};
        this.numeroVidas = 2;
        this.vidas = null;
        this.vidasJ2 = null;
        this.numeroVidasJ2 = 2;
        this.numero = 1;
        this.numero2 = 2;
    }

    preload() {
        this.load.image('pelota', 'imagenes/pelota.png');
        this.load.image('jugador1', 'imagenes/paddle.png');
        this.load.image('jugador2', 'imagenes/paddle.png');
        this.load.image('corazon', 'imagenes/corazon.png');
    }

    create() {
        this.vidas = new Vidas(this, this.numeroVidas);
        this.vidasJ2 = new VidasJ2(this, this.numeroVidasJ2);
        this.physics.world.setBoundsCollision(false, false, true, true);
        this.crearPelota();
        this.pelota.setVisible(false);

        this.jugador1 = this.physics.add.sprite(
            this.physics.world.bounds.width - (this.pelota.width / 2 + 1),
            this.physics.world.bounds.height / 2,
            'jugador1'
        );
        this.jugador1.body.setCollideWorldBounds(true, true, true, true);
        this.jugador1.setVisible(false);

        this.jugador2 = this.physics.add.sprite(
            (this.pelota.width / 2 + 1),
            this.physics.world.bounds.height / 2,
            'jugador2'
        );
        this.jugador2.body.setCollideWorldBounds(true, true, true, true)
        this.jugador2.setVisible(false);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.openingText = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            '   Pulsa espacio para empezar \nQuien consiga 5 puntos primero gana',
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '50px',
                fill: '#fff'
            }
        );
        this.openingText.setOrigin(0.5);

        this.jugador1.setImmovable(true);
        this.jugador2.setImmovable(true);
        this.physics.add.collider(this.pelota, this.jugador1);
        this.physics.add.collider(this.pelota, this.jugador2);

        this.vidas.create();
        this.vidasJ2.create();
    }

    update() {
        this.keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.jugador1.setVelocityY(0);
        this.jugador2.setVelocityY(0);

        if (this.pelota.x < 0) {
                this.endGame();
           
        }

        if (this.pelota.x > this.physics.world.bounds.width) {
                this.endGame();
           
        }

        if (this.cursors.up.isDown) {
            this.jugador1.setVelocityY(-350);
        } else if (this.cursors.down.isDown) {
            this.jugador1.setVelocityY(350);
        }

        if (this.keys.w.isDown) {
            this.jugador2.setVelocityY(-350);
        } else if (this.keys.s.isDown) {
            this.jugador2.setVelocityY(350);
        }

        if (!this.gameStarted) {
            if (this.cursors.space.isDown) {
                this.jugador2.setVisible(true);
                this.jugador1.setVisible(true);
                this.pelota.setVisible(true);
                this.gameStarted = true;
                const initialXSpeed = Math.random() * 300 + 50;
                const initialYSpeed = Math.random() * 300 + 50;
                this.pelota.setVelocityX(initialXSpeed);
                this.pelota.setVelocityY(initialYSpeed);
                this.openingText.setVisible(false);
            }
        }
    }

    resetPositions() {
        console.log('funciona2')
        this.openingText.setVisible(true);
        this.jugador2.setVisible(false);
        this.jugador1.setVisible(false);
        this.gameStarted = false;
        if (this.cursors.space.isDown) {
            this.crearPelotaMovimiento();
        }
    }
    crearPelotaMovimiento() {
        this.crearPelota();
        const initialXSpeed = Math.random() * 300 + 50;
        const initialYSpeed = Math.random() * 300 + 50;
        this.pelota.setVelocityX(initialXSpeed);
        this.pelota.setVelocityY(initialYSpeed);
    }
    crearPelota() {
        this.pelota = this.physics.add.sprite(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'pelota'
        );

        this.pelota.setCollideWorldBounds(true);
        this.pelota.setBounce(1.1);
        this.physics.add.collider(this.pelota, this.jugador1);
        this.physics.add.collider(this.pelota, this.jugador2);
    }

    endGame() {
        this.scene.start('endGame','J1');
    }
}
