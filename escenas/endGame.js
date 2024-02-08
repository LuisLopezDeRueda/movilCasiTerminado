// Importa la clase `botonReinicar` desde el módulo "../componentes/botonReiniciar".
import { botonReinicar } from "../componentes/botonReiniciar";

// Define una nueva escena de Phaser llamada `endGame`.
export class endGame extends Phaser.Scene {
    constructor() {
        // Llama al constructor de la clase Phaser.Scene con la clave 'endGame'.
        super({ key: 'endGame' });
        // Crea una instancia del botón de reinicio y la almacena en la propiedad `botonreinicio`.
        this.botonreinicio = new botonReinicar(this);
    }
    
    // Método `preload`: se llama antes de que comience la creación de la escena.
    preload() {
        // Precarga la imagen de fin del juego desde el archivo "congratulations.png".
        this.load.image('finJuego', 'imagenes/congratulations.png');
        // Precarga el archivo de audio de victoria desde la ruta especificada.
        this.load.audio('win', 'imagenes/win.mp3');
        // Llama al método `preload` de la instancia `botonreinicio` para precargar recursos adicionales.
        this.botonreinicio.preload();
    }
    
    // Método `create`: se llama una vez que se ha completado la precarga y se crea la escena.
    create() {
        // Crea y muestra el botón de reinicio.
        this.botonreinicio.create();
        // Crea y muestra la imagen de fin del juego en la posición (650, 90).
        this.gameoverImage = this.add.image(650, 90, 'finJuego');
        // Reproduce el sonido de victoria.
        this.sound.play('win');
    }
}
