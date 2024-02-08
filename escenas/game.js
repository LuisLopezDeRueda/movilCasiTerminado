// Importa las clases `VidasJ2` y `Vidas` desde sus respectivos módulos.
import { VidasJ2 } from "../componentes/VidasJ2";
import { Vidas } from "../componentes/vidas";

// Define una nueva escena de Phaser llamada `Game`.
export class Game extends Phaser.Scene {
    constructor() {
        // Llama al constructor de la clase Phaser.Scene con la clave 'game'.
        super({ key: 'game' });
        // Inicializa las variables de estado y configuración del juego.
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

    // Método `preload`: se llama antes de que comience la creación de la escena para cargar los recursos necesarios.
    preload() {
        // Carga las imágenes y recursos necesarios para el juego.
        this.load.image('pelota', 'imagenes/pelota.png');
        this.load.image('jugador1', 'imagenes/paddle.png');
        this.load.image('jugador2', 'imagenes/paddle.png');
        this.load.image('corazon', 'imagenes/corazon.png');
    }

    // Método `create`: se llama una vez que se ha completado la precarga y se crea la escena.
    create() {
        // Crea instancias de los objetos de vidas para ambos jugadores.
        this.vidas = new Vidas(this, this.numeroVidas);
        this.vidasJ2 = new VidasJ2(this, this.numeroVidasJ2);
        // Inicializa y muestra las vidas en la pantalla.
        this.vidas.create();
        this.vidasJ2.create();
        // Configura y crea el mundo del juego.
        this.crearMundo();
    }

    // Método `update`: se llama en cada fotograma para actualizar la lógica del juego.
    update() {
        // Asigna las teclas de movimiento para ambos jugadores.
        this.keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        // Detiene el movimiento de los jugadores al principio de cada fotograma.
        this.jugador1.setVelocityY(0);
        this.jugador2.setVelocityY(0);
       
        // Verifica si la pelota sale del área de juego y actualiza las vidas y el estado del juego en consecuencia.
        if (this.pelota.x < 0) {
            this.vidasJ2.liveLost();
            this.limpiar();
            this.crearMundo();
            this.gameStarted = false;
        }

        if (this.pelota.x > this.physics.world.bounds.width) {
            this.vidas.liveLost();
            this.limpiar();
            this.crearMundo();
            this.gameStarted = false;
        }

        // Controla el movimiento de los jugadores según las teclas presionadas.
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

        // Inicia el juego cuando se presiona la tecla de espacio.
        if (!this.gameStarted) {
            if (this.cursors.space.isDown) {
                this.jugador2.setVisible(true);
                this.jugador1.setVisible(true);
                this.pelota.setVisible(true);
                this.gameStarted = true;
                // Asigna velocidades iniciales aleatorias a la pelota.
                const initialXSpeed = Math.random() * 300 + 50;
                const initialYSpeed = Math.random() * 300 + 50;
                this.pelota.setVelocityX(initialXSpeed);
                this.pelota.setVelocityY(initialYSpeed);
                // Oculta el texto de inicio del juego.
                this.openingText.setVisible(false);
            }
        }
    }

    // Método `limpiar`: elimina los jugadores del juego.
    limpiar() {
        this.jugador1.destroy();
        this.jugador2.destroy();
    }

    // Método `resetPositions`: restablece las posiciones iniciales de los elementos del juego.
    resetPositions() {
        this.openingText.setVisible(true);
        this.jugador2.setVisible(false);
        this.jugador1.setVisible(false);
        this.gameStarted = false;
        if (this.cursors.space.isDown) {
            this.crearPelotaMovimiento();
        }
    }

    // Método `crearPelotaMovimiento`: crea la pelota y le asigna velocidades aleatorias.
    crearPelotaMovimiento() {
        this.crearPelota();
                // Asigna velocidades aleatorias a la pelota.
                const initialXSpeed = Math.random() * 300 + 50;
                const initialYSpeed = Math.random() * 300 + 50;
                this.pelota.setVelocityX(initialXSpeed);
                this.pelota.setVelocityY(initialYSpeed);
            }
        
            // Método `crearPelota`: crea y configura la pelota.
            crearPelota() {
                // Crea una nueva instancia de la pelota como un sprite físico.
                this.pelota = this.physics.add.sprite(
                    this.physics.world.bounds.width / 2,
                    this.physics.world.bounds.height / 2,
                    'pelota'
                );
        
                // Configura la pelota para que rebote en los límites del mundo.
                this.pelota.setCollideWorldBounds(true);
                this.pelota.setBounce(1.1);
        
                // Establece las colisiones de la pelota con los jugadores.
                this.physics.add.collider(this.pelota, this.jugador1);
                this.physics.add.collider(this.pelota, this.jugador2);
            }
        
            // Método `endGame`: inicia la escena de fin de juego.
            endGame() {
                this.scene.start('endGame');
            }
        
            // Método `crearMundo`: crea el mundo del juego con los jugadores y la pelota.
            crearMundo() {
                // Configura los límites de colisión del mundo físico.
                this.physics.world.setBoundsCollision(false, false, true, true);
        
                // Crea y configura la pelota.
                this.crearPelota();
                this.pelota.setVisible(false);
        
                // Crea y configura el jugador 1.
                this.jugador1 = this.physics.add.sprite(
                    this.physics.world.bounds.width - (this.pelota.width / 2 + 1),
                    this.physics.world.bounds.height / 2,
                    'jugador1'
                );
                this.jugador1.body.setCollideWorldBounds(true, true, true, true);
                this.jugador1.setVisible(false);
        
                // Crea y configura el jugador 2.
                this.jugador2 = this.physics.add.sprite(
                    (this.pelota.width / 2 + 1),
                    this.physics.world.bounds.height / 2,
                    'jugador2'
                );
                this.jugador2.body.setCollideWorldBounds(true, true, true, true);
                this.jugador2.setVisible(false);
        
                // Crea y configura el texto de inicio del juego.
                this.cursors = this.input.keyboard.createCursorKeys();
                this.openingText = this.add.text(
                    this.physics.world.bounds.width / 2,
                    this.physics.world.bounds.height / 2,
                    '       Pulsa espacio para empezar \nEl primero que se quede sin vidas pierde',
                    {
                        fontFamily: 'Monaco, Courier, monospace',
                        fontSize: '50px',
                        fill: '#fff'
                    }
                );
                this.openingText.setOrigin(0.5);
        
                // Establece que los jugadores no se muevan al colisionar con la pelota.
                this.jugador1.setImmovable(true);
                this.jugador2.setImmovable(true);
        
                // Agrega los colliders entre los jugadores y la pelota.
                this.physics.add.collider(this.jugador1, this.pelota);
                this.physics.add.collider(this.jugador2, this.pelota);
            }
        }
        