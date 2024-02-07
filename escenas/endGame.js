import { restartButton } from "./restartButton";
export class endGame extends Phaser.Scene{
    constructor(ganador){
        super({key:'endGame'})
        this.ganador = ganador
    }
    preload(){
        this.load.image('finJuego','imagenes/congratulations.png');
       // this.RestartButton.preload;
    }
    create(){
        //this.add.image(410,250,'background');
        //this.RestartButton.create();
        this.gameoverImage = this.add.image(650,90,'finJuego');
        this.openingText = this.add.text(
            370,
            120,
            'El '+this.ganador+' gana',
            {
                fontSize: '50px',
                fill: '#fff'
            }
        );
    }
}